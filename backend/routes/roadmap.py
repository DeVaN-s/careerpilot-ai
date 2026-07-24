from fastapi import APIRouter
from services.roadmap_service import generate_roadmap


router = APIRouter()


@router.post("/career-roadmap")
async def create_roadmap(data: dict):

    result = await generate_roadmap(data)

    return result