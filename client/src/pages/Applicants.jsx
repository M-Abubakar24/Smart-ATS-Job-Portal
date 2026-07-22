import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicants,
  updateApplicationStatus,
} from "../services/applicationService";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants(jobId);
      setApplications(data.applications);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);

      fetchApplicants();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Applicants...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Job Applicants
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl text-gray-500">
              No applicants yet.
            </h2>
          </div>
        ) : (
          <div className="space-y-6">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {app.applicant.fullName}
                    </h2>

                    <p>{app.applicant.email}</p>

                    <p>{app.applicant.phone}</p>

                    <p>{app.applicant.location}</p>

                    <p className="mt-2">
                      Experience: {app.applicant.experience} Years
                    </p>

                  </div>

                  <div>

                    <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
                      {app.status}
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-bold mb-2">
                    Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {app.applicant.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-bold">
                    Cover Letter
                  </h3>

                  <p className="mt-2">
                    {app.coverLetter || "No cover letter provided."}
                  </p>

                </div>

                <div className="mt-6 flex gap-3 flex-wrap">

                  {app.resume && (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                      View Resume
                    </a>
                  )}

                  <button
                    onClick={() =>
                      handleStatus(app._id, "Accepted")
                    }
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleStatus(app._id, "Rejected")
                    }
                    className="bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Applicants;