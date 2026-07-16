import os
import json

from core.resume_parser import extract_resume_text
from dotenv import load_dotenv
from groq import Groq

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings


# LOAD ENVIRONMENT VARIABLES

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# EMBEDDING MODEL

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# RECRUITER RANKING FUNCTION

def rank_resumes(resume_paths, job_description):

    # --------------------------------------------------
    # STEP 1: LOAD ALL UPLOADED RESUMES
    # --------------------------------------------------

    all_texts = []
    all_metadata = []

    for resume_path in resume_paths:

        try:

            resume_text = extract_resume_text(resume_path)
            print("\n========== EXTRACTED RESUME ==========")
            print("FILE:", resume_path)
            print("TEXT LENGTH:", len(resume_text))
            print("TEXT PREVIEW:")
            print(resume_text[:500])
            print("======================================\n")


            # Skip empty resumes
            if resume_text.strip() == "":
                continue


            # Get candidate filename
            candidate_name = os.path.basename(resume_path)


            # Store complete resume text
            all_texts.append(resume_text)


            # Store information about candidate
            all_metadata.append({
                "candidate": candidate_name,
                "path": resume_path,
                "resume_text": resume_text
            })


        except Exception as error:

            print(
                f"Skipping {resume_path}: {error}"
            )


    # --------------------------------------------------
    # CHECK WHETHER VALID RESUMES EXIST
    # -------------------------------------------------

    if len(all_texts) == 0:

        return []


    print(f"\nLoaded {len(all_texts)} resumes")

    # --------------------------------------------------
    # STEP 3: CREATE TEMPORARY VECTOR DATABASE
    # --------------------------------------------------

    vectorstore = Chroma.from_texts(

        texts=all_texts,

        embedding=embedding_model,

        metadatas=all_metadata
    )


    print("Temporary Chroma Vector Database Created")


    # --------------------------------------------------
    # STEP 4: SEMANTIC SEARCH USING JOB DESCRIPTION
    # --------------------------------------------------

    number_of_candidates = len(all_texts)
    results = vectorstore.similarity_search_with_score(job_description, k=number_of_candidates)

    # --------------------------------------------------
    # STEP 5: STORE RETRIEVED CANDIDATES
    # --------------------------------------------------

    retrieved_candidates = []

    for document, distance in results:

        retrieved_candidates.append({

            "candidate": document.metadata["candidate"],

            "resume_text": document.metadata["resume_text"],

            "path": document.metadata["path"],

            "semantic_distance": distance
        })


    print(
        f"Retrieved {len(retrieved_candidates)} candidates"
    )


    # --------------------------------------------------
    # STEP 6: SELECT CANDIDATES FOR LLM EVALUATION
    # --------------------------------------------------

    MAX_LLM_CANDIDATES = 20

    if len(retrieved_candidates) <= MAX_LLM_CANDIDATES:

        candidates_for_llm = retrieved_candidates

    else:

        candidates_for_llm = retrieved_candidates[
            :MAX_LLM_CANDIDATES
        ]


    print(
        f"Sending {len(candidates_for_llm)} candidates to Groq"
    )


    # --------------------------------------------------
    # STEP 7: SEND CANDIDATES TO GROQ
    # --------------------------------------------------

    candidate_scores = []

    for candidate_data in candidates_for_llm:

        candidate = candidate_data["candidate"]

        resume_text = candidate_data["resume_text"]

        print("\n==============================")
        print("Candidate:", candidate)
        print("Resume being sent to Groq:")
        print(resume_text[:1000])
        print("==============================")

        # YOUR PROMPT CONTINUES HERE

        prompt = f"""
You are an expert technical recruiter.

Evaluate the candidate's resume against the job description
using the scoring rubric below.

JOB DESCRIPTION:

{job_description}


CANDIDATE RESUME:

{resume_text}


SCORING RUBRIC:

1. Required Technical Skills: 0-40 points
2. Relevant Experience and Projects: 0-25 points
3. Education and Technical Background: 0-15 points
4. Tools, Frameworks, and Technologies: 0-10 points
5. Preferred Skills and Additional Qualifications: 0-10 points

The total score must be calculated by adding the five category scores.

Evaluate candidates strictly based only on evidence present in the resume.

Do not assume skills or experience that are not explicitly mentioned.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "technical_skills_score": 0,
    "experience_score": 0,
    "education_score": 0,
    "tools_score": 0,
    "preferred_skills_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "recommendation": "",
    "analysis_detail": ""
}}
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            response_format={
                "type": "json_object"
            },

            temperature=0.1
        )

        answer = response.choices[0].message.content


        # --------------------------------------------------
        # STEP 7: PARSE JSON RESPONSE
        # --------------------------------------------------

        analysis = json.loads(answer)
        print("\n-------------------------")
        print("CANDIDATE:", candidate)
        print("GROQ RESPONSE:")
        print(answer)
        print("-------------------------\n")


        technical_skills_score = analysis.get(
            "technical_skills_score",
            0
        )

        experience_score = analysis.get(
            "experience_score",
            0
        )

        education_score = analysis.get(
            "education_score",
            0
        )

        tools_score = analysis.get(
            "tools_score",
            0
        )

        preferred_skills_score = analysis.get(
            "preferred_skills_score",
            0
        )


        # --------------------------------------------------
        # CALCULATE FINAL SCORE
        # --------------------------------------------------

        score = (
            technical_skills_score
            + experience_score
            + education_score
            + tools_score
            + preferred_skills_score
        )


        # --------------------------------------------------
        # STEP 8: STORE CANDIDATE RESULT
        # --------------------------------------------------

        candidate_scores.append({

            "candidate": candidate,

            "score": score,

            "matching_skills": analysis.get(
                "matching_skills",
                []
            ),

            "missing_skills": analysis.get(
                "missing_skills",
                []
            ),

            "recommendation": analysis.get(
                "recommendation",
                ""
            ),

            "analysis_detail": analysis.get(
                "analysis_detail",
                ""
            )
        })


    # --------------------------------------------------
    # STEP 9: SORT CANDIDATES BY SCORE
    # --------------------------------------------------

    candidate_scores.sort(

        key=lambda candidate:
            candidate["score"],

        reverse=True
    )


    # --------------------------------------------------
    # STEP 10: ADD RANK
    # --------------------------------------------------

    for rank, candidate in enumerate(
        candidate_scores,
        start=1
    ):

        candidate["rank"] = rank


    # --------------------------------------------------
    # STEP 11: RETURN LEADERBOARD TO FLASK
    # --------------------------------------------------

    return candidate_scores