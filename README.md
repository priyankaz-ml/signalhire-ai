# SignalHire – AI-Powered Resume Screening & Candidate Ranking Platform

SignalHire is a full-stack AI application that streamlines resume screening using Large Language Models (LLMs), semantic search, and vector databases. The platform enables candidates to receive detailed AI-driven resume evaluations while helping recruiters efficiently rank multiple applicants against a job description.

## Live Demo

Frontend: https://signalhire-ai-amber.vercel.app/

## Overview

Traditional resume screening is time-consuming and often inconsistent. SignalHire automates this process by combining semantic retrieval with LLM-based analysis to generate meaningful candidate insights and rankings.

The platform provides two primary workflows:

- **Candidate Studio** – Analyze a single resume against a job description.
- **Recruiter Workspace** – Rank multiple candidates based on semantic similarity and AI evaluation.

---

## Features

### Candidate Studio

- Upload resumes in PDF or DOCX format.
- Analyze resumes against any job description.
- Generate AI-powered feedback and recommendations.
- Identify matching and missing skills.
- Receive detailed resume analysis.

### Recruiter Workspace

- Upload multiple resumes simultaneously.
- Perform semantic candidate retrieval using ChromaDB.
- Rank candidates automatically using an LLM.
- Compare candidates based on technical skills, experience, education, and tools.
- Generate recruiter-friendly evaluation reports.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Python
- Flask

### AI & Machine Learning

- Groq (Llama 3.3 70B)
- LangChain
- HuggingFace Sentence Transformers
- ChromaDB
- Natural Language Processing (NLP)
- Semantic Search
- Retrieval-Augmented Generation (RAG)

### Deployment

- Vercel
- Render

### Utilities

- Git & GitHub
- PDF & DOCX Parsing

---

## System Architecture

```
Frontend (React)
        │
        ▼
 Flask REST API
        │
        ├── Resume Parsing
        │
        ├── Embedding Generation
        │
        ├── ChromaDB Vector Store
        │
        ├── Semantic Search
        │
        └── Groq Llama 3.3
                │
                ▼
      Resume Analysis & Candidate Ranking
```

---

## Workflow

### Candidate Workflow

1. Upload a resume.
2. Provide a job description.
3. Extract text from the resume.
4. Analyze the resume using a Large Language Model.
5. Generate:
   - Matching skills
   - Missing skills
   - Recommendations
   - Detailed evaluation

### Recruiter Workflow

1. Upload multiple resumes.
2. Provide a job description.
3. Generate embeddings for each resume.
4. Retrieve the most relevant candidates using ChromaDB.
5. Evaluate shortlisted candidates with Groq Llama 3.3.
6. Rank candidates based on:
   - Technical skills
   - Experience
   - Education
   - Tools and technologies
   - Preferred qualifications

---

## Project Structure

```
signalhire-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── api/
│   ├── core/
│   ├── uploads/
│   ├── requirements.txt
│   └── app.py
│
└── README.md
```

---

## Local Setup

### Clone the Repository

```bash
git clone https://github.com/priyankaz-ml/signalhire-ai.git
cd signalhire-ai
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
python -m api.app
```

### Frontend

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Run the frontend:

```bash
npm run dev
```

---

## Future Enhancements

- User authentication
- Resume history
- Interview question generation
- Recruiter analytics dashboard
- Candidate comparison dashboard
- Resume match percentage
- Docker support
- Cloud database integration

---

## Author

**Priyanka Sharma**

GitHub: https://github.com/priyankaz-ml
