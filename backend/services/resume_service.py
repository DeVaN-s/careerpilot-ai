from pypdf import PdfReader
from groq import Groq
from dotenv import load_dotenv
from services.pdf_service import generate_resume_report
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def analyze_resume(file, job_description):

    # Create uploads folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Read PDF
    reader = PdfReader(file_path)

    resume_text = ""

    for page in reader.pages:
        resume_text += page.extract_text() or ""

    # Prompt
    prompt = f"""
You are an expert ATS resume analyzer.

Analyze this resume against the following job description.

RESUME

{resume_text}

JOB DESCRIPTION

{job_description}

Return ONLY valid JSON.

{{
    "ats_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Rules:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not explain anything.
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=1200,
        )

        ai_text = response.choices[0].message.content.strip()

        ai_text = ai_text.replace("```json", "")
        ai_text = ai_text.replace("```", "").strip()

        result = json.loads(ai_text)

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        result = {
            "ats_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": [
                "AI service temporarily unavailable"
            ]
        }

    # Generate PDF report
    pdf_file = generate_resume_report(result)

    return {
        "filename": file.filename,
        "report": pdf_file,
        **result
    }