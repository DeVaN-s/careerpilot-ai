from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def generate_cover_letter(data):

    job_role = data.get("job_role", "")
    company = data.get("company_name", "")
    skills = data.get("skills", "")

    prompt = f"""
You are an expert career coach.

Write a professional cover letter.

Job Role:
{job_role}

Company:
{company}

Candidate Skills:
{skills}

Requirements:
- Professional tone
- ATS friendly
- 3 to 5 paragraphs
- No markdown
- Return only the cover letter
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
            temperature=0.4,
            max_tokens=800
        )

        return {
            "cover_letter": response.choices[0].message.content.strip()
        }

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        return {
            "cover_letter": "AI service temporarily unavailable"
        }