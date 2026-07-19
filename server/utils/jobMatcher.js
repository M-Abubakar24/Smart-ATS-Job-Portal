const analyzeResumeText = require("./resumeAnalyzer");

function matchResumeWithJob(resumeText, jobDescription) {
  const resume = analyzeResumeText(resumeText);

  const jd = jobDescription.toLowerCase();

  const matchedSkills = [];
  const missingSkills = [];

  resume.detectedSkills.forEach((skill) => {
    if (jd.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    }
  });

  const allSkills = [
    ...resume.detectedSkills,
    ...resume.missingSkills,
  ];

  allSkills.forEach((skill) => {
    if (
      jd.includes(skill.toLowerCase()) &&
      !matchedSkills.includes(skill)
    ) {
      missingSkills.push(skill);
    }
  });

  const total = matchedSkills.length + missingSkills.length;

  const matchScore =
    total === 0
      ? 0
      : Math.round((matchedSkills.length / total) * 100);

  const recommendations = missingSkills.map(
    (skill) => `Consider learning ${skill}.`
  );

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    recommendations,
  };
}

module.exports = matchResumeWithJob;