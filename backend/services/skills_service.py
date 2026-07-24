from pypdf import PdfReader
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def extract_skills(file):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    reader = PdfReader(file_path)

    resume_text = ""

    for page in reader.pages:
        resume_text += page.extract_text() or ""

    prompt = f"""
You are an expert resume parser.

Extract information from this resume.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
    "technical_skills": [],
    "soft_skills": [],
    "programming_languages": [],
    "frameworks": [],
    "databases": [],
    "tools": [],
    "certifications": [],
    "education": [],
    "experience_level": ""
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
            max_tokens=1000,
        )

        ai_response = response.choices[0].message.content.strip()

        ai_response = ai_response.replace("```json", "")
        ai_response = ai_response.replace("```", "").strip()

        result = json.loads(ai_response)

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        result = {
            "technical_skills": [],
            "soft_skills": [],
            "programming_languages": [],
            "frameworks": [],
            "databases": [],
            "tools": [],
            "certifications": [],
            "education": [],
            "experience_level": "Unavailable"
        }

    return {
        "filename": file.filename,
        **result
    }