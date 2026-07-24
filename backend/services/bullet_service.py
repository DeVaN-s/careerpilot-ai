from groq import AsyncGroq
from dotenv import load_dotenv
import os

load_dotenv()


client = AsyncGroq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def enhance_bullet(data):

    bullet = data.get("bullet", "").strip()

    if not bullet:
        return {
            "enhanced": "Please provide a resume bullet point."
        }


    prompt = f"""
You are an expert ATS resume writer.

Improve this resume bullet point.

Original bullet:
{bullet}

Rules:
- Start with a strong action verb
- Make it ATS friendly
- Include measurable impact when possible
- Keep it concise
- Use professional resume language
- Return only the improved bullet point.
"""


    try:

        response = await client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role":"user",
                    "content":prompt
                }
            ],

            temperature=0.3,
            max_tokens=300

        )


        return {
            "enhanced":
            response.choices[0].message.content.strip()
        }


    except Exception as e:

        print("GROQ ERROR:", repr(e))

        return {
            "enhanced":
            "AI service temporarily unavailable"
        }