import { useState, useEffect } from "react";
import { Map, Sparkles, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { saveHistory } from "../utils/storage";
import CareerRoadmapSkeleton from "../components/skeletons/CareerRoadmapSkeleton";
import { API_URL } from "../config/api";
export default function CareerRoadmap() {
  const [career, setCareer] = useState("");
  const [level, setLevel] = useState("");
  const [roadmap, setRoadmap] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateRoadmap = async () => {
    if (!career || !level) {
      alert("Enter career and experience level");
      return;
    }

    if (loading) return;

    setLoading(true);
    setRoadmap("");

    const startTime = Date.now();

    try {
      const response = await fetch(
        "/api/career-roadmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career,
            level,
          }),
        }
      );

      const data = await response.json();

      const generatedRoadmap =
        data.roadmap || "No roadmap generated";

      setRoadmap(generatedRoadmap);

      saveHistory("Career Roadmap", {
        career,
        level,
        roadmap: generatedRoadmap,
      });
    } catch (error) {
      console.log(error);

      setRoadmap("Backend connection failed");
    } finally {
      const elapsed = Date.now() - startTime;
      const minimumTime = 1200;

      if (elapsed < minimumTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumTime - elapsed)
        );
      }

      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div
        className="
        min-h-screen
        p-4
        sm:p-6
        md:p-8
        bg-slate-100
        dark:bg-slate-950
      "
      >
        <CareerRoadmapSkeleton />
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      p-4
      sm:p-6
      md:p-8
      bg-slate-100
      dark:bg-slate-950
      text-slate-900
      dark:text-white
    "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
        "
        >
          AI Career Roadmap
        </h1>

        <p
          className="
          mt-2
          text-gray-500
          dark:text-gray-400
        "
        >
          Generate a personalized career learning path.
        </p>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
        max-w-4xl
        bg-white
        dark:bg-slate-900
        shadow
        rounded-xl
        p-4
        sm:p-6
        mt-8
      "
      >
        <div
          className="
          flex
          items-center
          gap-3
        "
        >
          <Map className="text-blue-600" />

          <h2
            className="
            text-lg
            sm:text-xl
            font-bold
          "
          >
            Create Roadmap
          </h2>
        </div>

        <input
          className="
          mt-5
          w-full
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          p-3
          rounded-lg
        "
          placeholder="Target Career (Example: Full Stack Developer)"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        />

        <input
          className="
          mt-4
          w-full
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          p-3
          rounded-lg
        "
          placeholder="Current Level (Beginner / Intermediate / Advanced)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <button
          onClick={generateRoadmap}
          disabled={loading}
          className="
          mt-5
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          text-white
          px-6
          py-3
          rounded-lg
          flex
          justify-center
          items-center
          gap-2
        "
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Roadmap
            </>
          )}
        </button>
      </motion.div>

      {loading && <CareerRoadmapSkeleton />}
            {roadmap && !loading && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          max-w-4xl
          bg-white
          dark:bg-slate-900
          shadow
          rounded-xl
          p-4
          sm:p-6
          mt-8
        "
        >
          <h2
            className="
            text-xl
            font-bold
            flex
            items-center
            gap-2
          "
          >
            <Clock className="text-blue-600" />
            Learning Timeline
          </h2>

          <div
            className="
            mt-5
            bg-slate-100
            dark:bg-slate-800
            rounded-lg
            p-6
            break-words
            text-gray-700
            dark:text-gray-300
            leading-relaxed
            prose
            prose-slate
            dark:prose-invert
            max-w-none

            prose-headings:font-bold
            prose-headings:text-slate-900
            dark:prose-headings:text-white

            prose-strong:text-slate-900
            dark:prose-strong:text-white

            prose-li:my-1
            prose-ul:list-disc
            prose-ol:list-decimal

            prose-code:text-blue-600
            dark:prose-code:text-blue-400
          "
          >
            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-10 mb-6 text-slate-900 dark:text-white border-b pb-3">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 text-blue-600 dark:text-blue-400">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="leading-8 my-5 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-slate-900 dark:text-white">
        {children}
      </strong>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-7 my-5 space-y-3">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-7 my-6 space-y-4">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="leading-8 marker:text-blue-600">
        {children}
      </li>
    ),

    hr: () => (
      <hr className="my-8 border-slate-300 dark:border-slate-700" />
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
        {children}
      </blockquote>
    ),

    code({ inline, children }) {
      if (inline) {
        return (
          <code className="bg-blue-100 dark:bg-slate-700 px-1 rounded">
            {children}
          </code>
        );
      }

      return (
        <pre className="bg-slate-900 text-white rounded-lg p-4 overflow-x-auto my-6">
          <code>{children}</code>
        </pre>
      );
    },
  }}
>
  {roadmap}
</ReactMarkdown>
          </div>
        </motion.div>
      )}
    </div>
  );
}