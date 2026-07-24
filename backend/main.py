import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routes import resume
from routes import cover_letter
from routes import interview
from routes import roadmap
from routes import bullet
from routes import chat
from routes import skills

os.makedirs("uploads", exist_ok=True)
os.makedirs("reports", exist_ok=True)

app = FastAPI(
    title="CareerPilot AI API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API Routes
# -----------------------------
app.include_router(resume.router)
app.include_router(cover_letter.router)
app.include_router(interview.router)
app.include_router(roadmap.router)
app.include_router(bullet.router)
app.include_router(chat.router)
app.include_router(skills.router)

# -----------------------------
# Static folders
# -----------------------------
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

if os.path.exists("dist/assets"):
    app.mount(
        "/assets",
        StaticFiles(directory="dist/assets"),
        name="assets"
    )

# -----------------------------
# React Frontend
# -----------------------------
@app.get("/")
async def root():
    return FileResponse("dist/index.html")


@app.get("/{path:path}")
async def frontend(path: str):
    file_path = os.path.join("dist", path)

    if os.path.isfile(file_path):
        return FileResponse(file_path)

    return FileResponse("dist/index.html")