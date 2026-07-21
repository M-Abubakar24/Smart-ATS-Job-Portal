import { useState } from "react";
import { analyzeResume } from "../services/authService";

const ATSAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const data = await analyzeResume();

      setAnalysis(data.analysis);
    } catch (error) {
      alert(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Resume ATS Analysis
        </h1>

        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {analysis && (
          <div className="mt-10 space-y-8">

            <div>
              <h2 className="text-xl font-bold">
                ATS Score
              </h2>

              <p className="text-5xl text-indigo-600 font-bold mt-3">
                {analysis.score}%
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                Skills Found
              </h2>

              <div className="flex flex-wrap gap-2">
                {analysis.detectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                Suggestions
              </h2>

              <ul className="list-disc pl-6">
                {analysis.suggestions.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ATSAnalysis;