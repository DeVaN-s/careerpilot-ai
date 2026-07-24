import { useState, useEffect } from "react";
import { Upload, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { saveHistory } from "../utils/storage";
import SkillsExtractorSkeleton from "../components/skeletons/SkillsExtractorSkeleton";
import { API_URL } from "../config/api";
export default function SkillsExtractor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const extractSkills = async () => {
    if (!file) {
      alert("Upload a resume first.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "/api/extract-skills", 
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data);

      saveHistory("Skills Extraction", data);
    } catch (error) {
      console.log(error);
      alert("Backend connection failed.");
    }

    setLoading(false);
  };

  const renderList = (title, items) => {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="mt-3 flex flex-col gap-3">
          {items && items.length > 0 ? (
            items.map((item, index) =>
              typeof item === "object" && item !== null ? (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3"
                >
                  {Object.entries(item).map(([key, value]) => (
                    <p key={key} className="text-sm">
                      <span className="font-semibold capitalize">
                        {key.replace(/_/g, " ")}:
                      </span>{" "}
                      {Array.isArray(value)
                        ? value.join(", ")
                        : String(value)}
                    </p>
                  ))}
                </div>
              ) : (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm w-fit"
                >
                  {item}
                </span>
              )
            )
          ) : (
            <span className="text-gray-500 text-sm">None</span>
          )}
        </div>
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-slate-950">
        <SkillsExtractorSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold">
          AI Resume Skills Extractor
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Extract skills, technologies and qualifications from your resume.
        </p>
      </motion.div>

      <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl shadow p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="text-blue-600" />
          <h2 className="text-xl font-bold">Upload Resume</h2>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-5 w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 rounded-lg"
        />

        {file && (
          <p className="mt-3 text-sm text-gray-500">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={extractSkills}
          disabled={loading}
          className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Upload size={18} />
          {loading ? "Extracting..." : "Extract Skills"}
        </button>
      </div>

      {loading && <SkillsExtractorSkeleton />}
            {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white dark:bg-slate-900 rounded-xl shadow p-4 sm:p-6"
        >
          <h2 className="text-2xl font-bold mb-5">
            Extracted Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderList(
              "Technical Skills",
              result.technical_skills
            )}

            {renderList(
              "Soft Skills",
              result.soft_skills
            )}

            {renderList(
              "Programming Languages",
              result.programming_languages
            )}

            {renderList(
              "Frameworks",
              result.frameworks
            )}

            {renderList(
              "Databases",
              result.databases
            )}

            {renderList(
              "Tools",
              result.tools
            )}

            {renderList(
              "Certifications",
              result.certifications
            )}

            {renderList(
              "Education",
              result.education
            )}
          </div>

          <div className="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
            <h3 className="font-bold text-lg">
              Experience Level
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {typeof result.experience_level === "object"
                ? JSON.stringify(result.experience_level)
                : result.experience_level || "Not detected"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}