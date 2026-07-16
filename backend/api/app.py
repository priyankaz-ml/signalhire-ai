from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from core.analyze_resume import analyze_resume
from core.rank_resumes import rank_resumes
import os

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER,exist_ok=True)

#HOME ROUTE
@app.route("/")
def home():
    return "Resume Screener Backend Running!"

#HEALTH ROUTE
@app.route("/health")
def health():
    return jsonify({"status":"healthy"})

#CANDIDATE RESUME ANALYSIS ROUTE
@app.route("/analyze-resume", methods=["POST"])
def analyze_resume_api():
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded "}), 400
    resume = request.files["resume"]
    job_description = request.form.get("job_description", "")

    if not job_description.strip():
        return jsonify({"error":"Job Description is required"}), 400
    
    #MAKE FILENAME SAFE
    filename = secure_filename(resume.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    resume.save(file_path)
    try:
        result = analyze_resume(file_path, job_description)
        return jsonify({"analysis": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# RECRUITER RESUME RANKING ROUTE
@app.route("/rank-resumes", methods=["POST"])
def rank_resumes_api():

    # Get all uploaded resumes
    resumes = request.files.getlist("resumes")

    # Get job description
    job_description = request.form.get(
        "job_description",
        ""
    )

    # Check if resumes were uploaded
    if not resumes:

        return jsonify({
            "error": "No resumes uploaded"
        }), 400

    # Check if job description exists
    if not job_description.strip():

        return jsonify({
            "error": "Job description is required"
        }), 400


    # Store paths of saved resumes
    resume_paths = []


    # Save every uploaded resume
    for resume in resumes:

        filename = secure_filename(
            resume.filename
        )

        file_path = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        resume.save(file_path)

        resume_paths.append(file_path)


    try:

        # Call recruiter ranking pipeline
        results = rank_resumes(
            resume_paths,
            job_description
        )


        # Return leaderboard as JSON
        return jsonify({
            "candidates": results
        })


    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500
    
if __name__ == "__main__":

    app.run(debug=True)