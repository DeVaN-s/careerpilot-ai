# 🚀 CareerPilot AI

> An AI-powered career development platform that helps students and professionals build resumes, generate cover letters, prepare for interviews, extract skills, and receive personalized career guidance using AI.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/Hosted%20on-AWS%20Elastic%20Beanstalk-FF9900?logo=amazonaws&logoColor=white)

---

# 🌐 Live Demo

### 🚀 Try CareerPilot AI

**Live Website**

👉 **http://careerpilot-env.eba-92kvndh3.ap-south-1.elasticbeanstalk.com/**

---

# 📖 Overview

CareerPilot AI is a full-stack AI-powered career assistant that helps students, graduates, and professionals improve their career prospects.

The application integrates multiple AI tools into one platform, allowing users to analyze resumes, generate professional cover letters, prepare for interviews, enhance resume bullet points, create personalized career roadmaps, extract technical skills, and interact with an intelligent AI career assistant.

---

# ✨ Features

## 🤖 AI Career Chat

- AI-powered career guidance
- Technology recommendations
- Career planning
- Learning suggestions
- General career questions

## 📄 Resume Analyzer

- ATS resume analysis
- Resume improvement suggestions
- Resume scoring
- Professional feedback
- Keyword recommendations

## ✉️ Cover Letter Generator

- AI-generated cover letters
- Personalized content
- Professional formatting
- Job-specific customization

## 🎤 Interview Coach

- HR interview questions
- Technical interview questions
- AI feedback
- Confidence improvement

## 🛣 Career Roadmap Generator

- Personalized learning roadmap
- Technology recommendations
- Career progression
- Step-by-step learning path

## 💡 Resume Bullet Enhancer

- Improve resume bullet points
- Action-oriented writing
- Better impact statements
- Professional language

## 🧠 Skills Extractor

- Extract skills from resumes
- Categorize technical skills
- Categorize soft skills
- Identify missing skills

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router

## Backend

- FastAPI
- Python
- Groq API
- Pydantic

## Deployment

- Docker
- Docker Compose
- Nginx
- AWS Elastic Beanstalk

---

# 📂 Project Structure

```text
CareerPilot-AI
│
├── backend
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── reports
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── public
│   ├── src
│   ├── components
│   ├── pages
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/DeVaN-s/careerpilot-ai.git
```

Move into the project folder.

```bash
cd careerpilot-ai
```

---

## 2. Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the FastAPI server.

```bash
uvicorn main:app --reload
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
GROQ_API_KEY=your_groq_api_key
```

---

# 🐳 Docker

Build and run using Docker.

```bash
docker compose up --build
```

---

# ☁️ Deployment

The project is configured for deployment using:

- Docker
- AWS Elastic Beanstalk
- Nginx

---

# 🚀 Future Improvements

- User Authentication
- Resume History
- Chat History
- Job Recommendation Engine
- LinkedIn Profile Analysis
- Portfolio Review
- Dark Mode
- Multi-language Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Devan S**

GitHub: https://github.com/DeVaN-s

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
