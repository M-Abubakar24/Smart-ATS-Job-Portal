import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { applyJob } from "../services/applicationService";

const JobDetails = () => {
const { id } = useParams();

const [job, setJob] = useState(null);
const [loading, setLoading] = useState(true);
const [applying, setApplying] = useState(false);

useEffect(() => {
    fetchJob();
}, []);

const fetchJob = async () => {
  try {
    const data = await getJobById(id);
      setJob(data.job);
    }catch (error) {
      console.log(error);
      alert("Failed to load job details.");
    }finally {
      setLoading(false);
    }
  };
const handleApply = async () => {
  try{
    setApplying(true);

    await applyJob(job._id);

    alert("Application submitted successfully!");
  }catch (error) {
    alert(error.response?.data?.message || "Application failed");
  }finally {
    setApplying(false);
  }
};
  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  if (!job) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Job Not Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold">
          {job.title}
        </h1>

        <p className="text-xl text-indigo-600 mt-2">
          {job.company}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <p><strong>📍 Location:</strong> {job.location}</p>

          <p><strong>💰 Salary:</strong> ${job.salary}</p>

          <p><strong>🕒 Employment:</strong> {job.employmentType}</p>

          <p><strong>⭐ Experience:</strong> {job.experienceLevel}</p>

        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">
            Job Description
          </h2>

          <p className="text-gray-700">
            {job.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">
            Requirements
          </h2>

          <ul className="list-disc ml-6">
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
              >

                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
  onClick={handleApply}
  disabled={applying}
  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
>
  {applying ? "Applying..." : "Apply Now"}
</button>

      </div>
    </div>
  );
};

export default JobDetails;