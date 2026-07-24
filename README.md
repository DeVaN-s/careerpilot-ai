# 🚀 CareerPilot AI

> An AI-powered career development platform that helps users build resumes, generate cover letters, prepare for interviews, extract skills, and receive personalized career guidance.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python)
![Docker](https://img.shields.io/badge/Deployment-Docker-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900?logo=amazonaws)

---

## 📖 Overview

CareerPilot AI is an intelligent career assistant designed to help students and professionals accelerate their career growth using AI.

The platform offers multiple AI-powered tools including resume analysis, interview preparation, cover letter generation, career roadmaps, skills extraction, resume bullet enhancement, and an AI career chatbot—all within a modern, responsive web application.

---

## ✨ Features

### 🤖 AI Career Chat
- Career guidance
- Job search advice
- Skill recommendations
- Learning resources

### 📄 Resume Analyzer
- Resume evaluation
- ATS-friendly suggestions
- Improvement recommendations
- Professional feedback

### ✉️ Cover Letter Generator
- Personalized cover letters
- Job-specific content
- Professional formatting

### 🎤 AI Interview Coach
- Mock interview questions
- Technical & HR interview preparation
- AI-generated feedback

### 🛣️ Career Roadmap Generator
- Personalized learning roadmap
- Technology recommendations
- Career progression planning

### 💡 Resume Bullet Enhancer
- Improves resume bullet points
- Makes achievements more impactful
- Uses action-oriented language

### 🧠 Skills Extractor
- Extracts skills from resumes
- Categorizes technical & soft skills
- Identifies missing skills

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- FastAPI
- Python
- Groq API
- Pydantic

### Deployment
- Docker
- Docker Compose
- AWS Elastic Beanstalk
- Nginx

---

## 📂 Project Structure

```
CareerPilot-AI/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── reports/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

### Home Page

![Home](screenshots/home.png)

### AI Career Chat

![Chat](screenshots/chat.png)

### Resume Analyzer

![Resume](screenshots/resume.png)

### Interview Coach

![Interview](screenshots/interview.png)

### Career Roadmap

![Roadmap](screenshots/roadmap.png)

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/DeVaN-s/careerpilot-ai.git
```

### Go to project directory

```bash
cd careerpilot-ai
```

---

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
GROQ_API_KEY=your_api_key_here
```

---

## 🐳 Docker

Build and run using Docker Compose

```bash
docker compose up --build
```

---

## ☁️ Deployment

The project is configured for deployment using:

- AWS Elastic Beanstalk
- Docker
- Nginx

---

## 📈 Future Improvements

- User authentication
- Resume history
- Chat history
- Job recommendation engine
- LinkedIn profile analysis
- AI portfolio review
- Multi-language support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Devan S**

GitHub: https://github.com/DeVaN-s

---

⭐ If you found this project useful, consider giving it a star!
