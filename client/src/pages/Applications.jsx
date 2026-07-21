import { useEffect, useState } from "react";
import {
  getMyApplications,
  withdrawApplication,
} from "../services/applicationService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications);
    } catch (error) {
      console.log(error);
      alert("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    const confirmWithdraw = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmWithdraw) return;

    try {
      await withdrawApplication(id);

      alert("Application withdrawn successfully.");

      fetchApplications();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Applications...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl text-gray-500">
              You haven't applied for any jobs yet.
            </h2>
          </div>
        ) : (
          <div className="space-y-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {application.job.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {application.job.company}
                    </p>

                    <p className="mt-2">
                      📍 {application.job.location}
                    </p>

                    <p className="mt-2">
                      💰 ${application.job.salary}
                    </p>

                    <p className="mt-2">
                      🕒 {application.job.employmentType}
                    </p>

                    <p className="mt-2">
                      ⭐ {application.job.experienceLevel}
                    </p>

                    <p className="mt-3">
                      <strong>Status:</strong>{" "}
                      <span className="text-indigo-600">
                        {application.status}
                      </span>
                    </p>

                    <p className="text-gray-500 mt-2">
                      Applied on{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleWithdraw(application._id)
                    }
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                  >
                    Withdraw
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

export default Applications;