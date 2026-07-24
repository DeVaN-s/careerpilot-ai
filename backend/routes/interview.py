from fastapi import APIRouter
from services.interview_service import interview_feedback


router = APIRouter()


@router.post("/interview-coach")
async def create_interview_feedback(data: dict):

    result = await interview_feedback(data)

    return result