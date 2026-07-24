from fastapi import APIRouter
from services.bullet_service import enhance_bullet


router = APIRouter()


@router.post("/enhance-bullet")
async def improve_bullet(data: dict):

    result = await enhance_bullet(data)

    return result