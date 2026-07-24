from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def generate_roadmap(data):

    career = data.get("career", "")
    level = data.get("level", "")

    prompt = f"""
You are CareerPilot AI, an expert career mentor.

Create a detailed roadmap for the following career.

Target Career:
{career}

Current Level:
{level}

IMPORTANT:
Return ONLY valid Markdown.

=========================
FORMATTING RULES
=========================

- The output MUST render perfectly in ReactMarkdown.
- Do NOT write any introduction or conclusion.
- Do NOT wrap the answer in code blocks.
- Use Markdown only.

- Every section MUST start with a heading like:

## **1. Skills to Learn**

## **2. Tools and Technologies**

## **3. Projects to Build**

## **4. Learning Timeline**

## **5. Career Growth**

## **6. Interview Preparation**

- Leave ONE completely blank line after every heading.

- Leave ONE blank line before every new section.

- Leave ONE blank line before and after every list.

- Use "-" for ALL bullet lists.

Example:

- **Python**
- **TensorFlow**
- **Git**

NOT

* Python

- Bold only:
  - Section titles
  - Job titles
  - Technologies
  - Important keywords

- Keep spacing clean and readable.

=========================
CONTENT
=========================

## **1. Skills to Learn**

Include:

- Core technical skills
- Soft skills
- Certifications

## **2. Tools and Technologies**

Include:

- Programming Languages
- Frameworks
- Databases
- Cloud Platforms
- Developer Tools

## **3. Projects to Build**

Create three categories.

### Beginner

- 3 beginner projects

### Intermediate

- 3 intermediate projects

### Advanced

- 3 portfolio projects

## **4. Learning Timeline**

Create a month-by-month roadmap.

## **5. Career Growth**

Include:

- Entry Level role
- Mid Level role
- Senior role
- Leadership role
- Salary in India (₹ LPA)

## **6. Interview Preparation**

Include:

- Technical preparation
- Coding platforms
- Resume tips
- Portfolio tips
- Frequently asked interview questions

Return ONLY Markdown.
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert career mentor who always outputs clean GitHub-flavored Markdown."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=1400
        )

        return {
            "roadmap": response.choices[0].message.content.strip()
        }

    except Exception as e:

        print("GROQ ERROR:", repr(e))

        return {
            "roadmap": "AI service temporarily unavailable"
        }