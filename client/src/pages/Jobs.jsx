import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
 const navigate = useNavigate();
  useEffect(() => {
    fetchJobs();
  }, [keyword]);

 const fetchJobs = async () => {
  try {
    setLoading(true);

    const data = await getJobs(keyword);

    console.log(data);       // Add this
    console.log(data.jobs);  // Add this

    setJobs(data.jobs);
  } catch (error) {
    console.log(error);
    alert("Failed to load jobs");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Browse Jobs
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading ? (
          <h2 className="text-center text-2xl">
            Loading Jobs...
          </h2>
        ) : jobs.length === 0 ? (
          <h2 className="text-center text-gray-500 text-xl">
            No jobs found.
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-gray-600 mt-2 font-medium">
                  {job.company}
                </p>

                <p className="mt-3">
                  📍 <span className="font-medium">{job.location}</span>
                </p>

                <p className="mt-2">
                  💰 <span className="font-medium">${job.salary}</span>
                </p>

                <p className="mt-2">
                  🕒 <span className="font-medium">{job.employmentType}</span>
                </p>

                <p className="mt-2">
                  ⭐ <span className="font-medium">{job.experienceLevel}</span>
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

             <button
  onClick={() => navigate(`/jobs/${job._id}`)}
  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
>
  View Details
</button>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;