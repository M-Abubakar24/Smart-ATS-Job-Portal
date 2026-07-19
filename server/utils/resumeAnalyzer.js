const skillCategories = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Angular",
    "Vue",
    "Tailwind CSS",
    "Bootstrap",
  ],

  backend: [
    "Node.js",
    "Express",
    "Django",
    "Laravel",
    "Flask",
    "Spring Boot",
    "ASP.NET",
  ],

  database: [
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Firebase",
  ],

  languages: [
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Go",
  ],

  tools: [
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Azure",
    "Linux",
    "Jenkins",
    "Postman",
  ],
};

function analyzeResumeText(text) {
  const lowerText = text.toLowerCase();

  // Detect skills by category
  const skills = {};

  Object.keys(skillCategories).forEach((category) => {
    skills[category] = skillCategories[category].filter((skill) =>
      lowerText.includes(skill.toLowerCase())
    );
  });

  const detectedSkills = Object.values(skills).flat();

  const allSkills = Object.values(skillCategories).flat();

  const missingSkills = allSkills.filter(
    (skill) => !detectedSkills.includes(skill)
  );

  // ATS Score
  let score = 0;

  const contact = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i.test(text),
    phone: /\+?\d[\d\s\-()]{8,}/.test(text),
    github: /github/i.test(text),
    linkedin: /linkedin/i.test(text),
    portfolio: /portfolio|behance|dribbble|vercel|netlify/i.test(text),
  };

  if (contact.email) score += 10;
  if (contact.phone) score += 10;
  if (contact.github) score += 5;
  if (contact.linkedin) score += 5;

  const sections = {
    education: /education/i.test(text),
    experience: /experience/i.test(text),
    projects: /project/i.test(text),
    skills: /skills/i.test(text),
    certifications: /certification|certificate/i.test(text),
    achievements: /achievement|award/i.test(text),
  };

  if (sections.education) score += 10;
  if (sections.experience) score += 15;
  if (sections.projects) score += 15;

  score += Math.min(detectedSkills.length * 2, 30);
  score = Math.min(score, 100);

  let strength = "Needs Improvement";

  if (score >= 90) strength = "Excellent";
  else if (score >= 75) strength = "Good";
  else if (score >= 60) strength = "Average";

  const suggestions = [];

  if (!contact.github)
    suggestions.push("Add your GitHub profile.");

  if (!contact.linkedin)
    suggestions.push("Include your LinkedIn profile.");

  if (!detectedSkills.includes("Docker"))
    suggestions.push("Learning Docker can strengthen your backend profile.");

  if (!detectedSkills.includes("AWS"))
    suggestions.push("Consider adding AWS or another cloud platform.");

  if (!sections.projects)
    suggestions.push("Include a Projects section.");

  if (!sections.certifications)
    suggestions.push("Add relevant certifications.");

  if (detectedSkills.length < 8)
    suggestions.push("Include more technical skills relevant to your career.");

  return {
    score,
    strength,
    contact,
    sections,
    skills,
    detectedSkills,
    missingSkills: missingSkills.slice(0, 10),
    suggestions,
    summary: `Detected ${detectedSkills.length} technical skills. Resume strength is ${strength}. ATS Score: ${score}/100.`,
  };
}

module.exports = analyzeResumeText;