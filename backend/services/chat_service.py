from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def career_chat_stream(data):

    message = data.get("message", "")

    prompt = f"""
You are CareerPilot AI, an expert career assistant.

Answer the user's career question.

User question:
{message}

Formatting rules:
- Use Markdown.
- Use ## for section headings.
- Make important terms and job titles **bold**.
- Use proper bullet lists with "-" instead of "*".
- Never wrap the entire answer in code blocks.
- Keep answers clean and professional.

Example:

## Top AI Careers

- **Machine Learning Engineer**
  - Builds AI models and prediction systems.

- **AI Consultant**
  - Helps companies adopt AI solutions.

- **Data Scientist**
  - Analyzes data and creates predictive models.
Career Guidelines:

- If the user asks about careers or jobs, explain:
  - What the role does.
  - Required skills.
  - Recommended learning path.
  - Typical qualifications.
  - Industries hiring.
  - Future demand.
  - Remote work opportunities (if applicable).
  - Career progression.
  - Approximate salary range in India (Fresher, Mid-Level, Senior).
  
Now answer the user's question.

Give a clear and useful answer.
"""

    try:

        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5,
            stream=True
        )

        for chunk in stream:
            content = chunk.choices[0].delta.content

            if content:
                yield content

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        yield "AI service temporarily unavailable"