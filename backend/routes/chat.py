from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from services.chat_service import career_chat_stream

router = APIRouter()


@router.post("/career-chat")
async def chat_with_ai(data: dict):
    return StreamingResponse(
        career_chat_stream(data),
        media_type="text/plain"
    )