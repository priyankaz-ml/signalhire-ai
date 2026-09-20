import os

from dotenv import load_dotenv
from groq import Groq
from core.resume_parser import extract_resume_text

#LOAD ENVIRONMENT VARIABLES
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_resume(resume_path,job_description):
    #READ RESUME
    resume_text = extract_resume_text(resume_path)
    if not resume_text.strip():
        raise ValueError("Could not extract text from the uploaded resume.")
    #CREATE PROMPT FOR GROQ
    prompt = f"""
You are an expert ATS resume analyzer and career advisor.

Your job is to compare the candidate's resume with the given
job description.

RESUME:

{resume_text}


JOB DESCRIPTION:

{job_description}


Analyze the candidate carefully.

Return the result in EXACTLY this format:

Match Score: XX

Eligibility:
Excellent Match / Good Match / Moderate Match / Poor Match

Matching Skills:
- skill
- skill

Missing Skills:
- skill
- skill

Improvements:
- specific improvement the candidate should make
- specific improvement the candidate should make

Recommendation:
Give a short final recommendation explaining whether the candidate
should apply for this role and what they should focus on improving.
"""
    #SEND REQ TO GROQ
    response = client.chat.completions.create(model="openai/gpt-oss-20b",messages=[{"role":"user","content":prompt}])
    #GET GROQ'S ANS
    answer = response.choices[0].message.content
    return answer