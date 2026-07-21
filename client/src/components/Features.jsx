import {
  FaFileAlt,
  FaSearch,
  FaBriefcase,
  FaUserShield,
  FaChartLine,
  FaBookmark,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaFileAlt className="text-4xl text-indigo-600" />,
      title: "ATS Resume Analysis",
      description:
        "Analyze resumes and improve them for Applicant Tracking Systems.",
    },
    {
      icon: <FaSearch className="text-4xl text-indigo-600" />,
      title: "Smart Job Search",
      description:
        "Search jobs using keywords, location, and job type filters.",
    },
    {
      icon: <FaBriefcase className="text-4xl text-indigo-600" />,
      title: "Easy Applications",
      description:
        "Apply to jobs in one click using your uploaded resume.",
    },
    {
      icon: <FaBookmark className="text-4xl text-indigo-600" />,
      title: "Save Jobs",
      description:
        "Bookmark jobs and apply whenever you're ready.",
    },
    {
      icon: <FaChartLine className="text-4xl text-indigo-600" />,
      title: "Track Applications",
      description:
        "Monitor your job application status in one dashboard.",
    },
    {
      icon: <FaUserShield className="text-4xl text-indigo-600" />,
      title: "Secure Authentication",
      description:
        "JWT authentication keeps your account safe and secure.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose Smart ATS?
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Everything you need to find your next opportunity and manage your career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow hover:shadow-xl transition"
            >
              {feature.icon}

              <h3 className="text-2xl font-semibold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;