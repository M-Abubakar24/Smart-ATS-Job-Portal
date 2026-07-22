import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/recruiterService";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
      alert("Failed to load your jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(jobId);
      alert("Job deleted successfully.");
      fetchJobs();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Jobs
        </h1>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Jobs Posted Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first job posting.
            </p>

            <Link
              to="/create-job"
              className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Create Job
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-gray-600 font-medium">
                  {job.company}
                </p>

                <p className="mt-2">
                  📍 {job.location}
                </p>

                <p>
                  💰 ${job.salary}
                </p>

                <p>
                  🕒 {job.employmentType}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <Link
                    to={`/edit-job/${job._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/applicants/${job._id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                  >
                    View Applicants
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyJobs;