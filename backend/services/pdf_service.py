from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os
import uuid


def generate_resume_report(data):

    os.makedirs("reports", exist_ok=True)

    filename = f"{uuid.uuid4()}.pdf"

    filepath = os.path.join("reports", filename)

    doc = SimpleDocTemplate(filepath)

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>CareerPilot AI Resume Report</b>", styles["Title"]))

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {data.get('ats_score',0)}%",
            styles["Heading2"],
        )
    )

    story.append(Paragraph("<b>Matching Skills</b>", styles["Heading2"]))

    for item in data.get("matching_skills", []):
        story.append(Paragraph(f"• {item}", styles["BodyText"]))

    story.append(Paragraph("<b>Missing Skills</b>", styles["Heading2"]))

    for item in data.get("missing_skills", []):
        story.append(Paragraph(f"• {item}", styles["BodyText"]))

    story.append(Paragraph("<b>Strengths</b>", styles["Heading2"]))

    for item in data.get("strengths", []):
        story.append(Paragraph(f"• {item}", styles["BodyText"]))

    story.append(Paragraph("<b>Weaknesses</b>", styles["Heading2"]))

    for item in data.get("weaknesses", []):
        story.append(Paragraph(f"• {item}", styles["BodyText"]))

    story.append(Paragraph("<b>Suggestions</b>", styles["Heading2"]))

    for item in data.get("suggestions", []):
        story.append(Paragraph(f"• {item}", styles["BodyText"]))

    doc.build(story)

    return filename