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
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Resume ATS Analysis
        </h1>

        <div className="text-center mb-10">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {analysis && (
          <>

            {/* Score */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-center">
              <h2 className="text-2xl font-bold">
                ATS Score
              </h2>

              <p className="text-6xl font-bold text-indigo-600 mt-4">
                {analysis.score}
              </p>

              <p className="text-xl mt-2">
                {analysis.strength}
              </p>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">
                Summary
              </h2>

              <p>{analysis.summary}</p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">
                Contact Information
              </h2>

              <ul className="space-y-2">
                <li>{analysis.contact.email ? "✅" : "❌"} Email</li>
                <li>{analysis.contact.phone ? "✅" : "❌"} Phone</li>
                <li>{analysis.contact.github ? "✅" : "❌"} GitHub</li>
                <li>{analysis.contact.linkedin ? "✅" : "❌"} LinkedIn</li>
              </ul>
            </div>

            {/* Resume Sections */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">
                Resume Sections
              </h2>

              <ul className="space-y-2">
                <li>{analysis.sections.education ? "✅" : "❌"} Education</li>
                <li>{analysis.sections.experience ? "✅" : "❌"} Experience</li>
                <li>{analysis.sections.projects ? "✅" : "❌"} Projects</li>
                <li>{analysis.sections.skills ? "✅" : "❌"} Skills</li>
                <li>{analysis.sections.certifications ? "✅" : "❌"} Certifications</li>
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">
                Detected Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {analysis.detectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h2 className="text-2xl font-bold mb-3">
                Suggestions
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                {analysis.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default ATSAnalysis;