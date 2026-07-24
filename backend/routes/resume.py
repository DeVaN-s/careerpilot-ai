from fastapi import APIRouter, UploadFile, File, Form
from services.resume_service import analyze_resume


router = APIRouter()


@router.post("/analyze-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):

    result = await analyze_resume(
        file,
        job_description
    )

    return result