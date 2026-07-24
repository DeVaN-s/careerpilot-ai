from fastapi import APIRouter, UploadFile, File
from services.skills_service import extract_skills

router = APIRouter()


@router.post("/extract-skills")
async def extract_resume_skills(
    file: UploadFile = File(...)
):
    return await extract_skills(file)