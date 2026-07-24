import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          CareerPilot AI
        </Link>

        <div className="flex gap-5 text-sm">

          <Link to="/">Dashboard</Link>

          <Link to="/resume">Resume</Link>

          <Link to="/cover-letter">Cover Letter</Link>

          <Link to="/interview">Interview</Link>

          <Link to="/roadmap">Roadmap</Link>

          <Link to="/bullet">Bullet AI</Link>

          <Link to="/skills">Skills</Link>

          <Link to="/chat">AI Chat</Link>

        </div>

      </div>

    </nav>
  );
}