from fastapi import APIRouter
from services.cover_letter_service import generate_cover_letter


router = APIRouter()


@router.post("/generate-cover-letter")
async def create_cover_letter(data: dict):

    result = await generate_cover_letter(data)

    return result