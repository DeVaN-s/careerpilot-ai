from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def interview_feedback(data):

    role = data.get("role", "")
    question = data.get("question", "")
    answer = data.get("answer", "")

    prompt = f"""
You are an expert technical interviewer.

Analyze this interview answer.

Job Role:
{role}

Question:
{question}

Candidate Answer:
{answer}

Provide:

1. Answer quality score out of 10
2. Strengths
3. Weaknesses
4. Improvements
5. Better sample answer

Return only the feedback.
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
            max_tokens=1000
        )

        return {
            "feedback": response.choices[0].message.content.strip()
        }

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        return {
            "feedback": "AI service temporarily unavailable"
        }