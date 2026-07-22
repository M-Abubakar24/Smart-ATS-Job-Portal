import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecruiterDashboard } from "../services/recruiterService";

const RecruiterDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getRecruiterDashboard();
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Dashboard...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your jobs and applicants.
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Jobs</h2>
            <p className="text-4xl font-bold text-indigo-600 mt-3">
              {dashboard.totalJobs}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Applications</h2>
            <p className="text-4xl font-bold text-blue-600 mt-3">
              {dashboard.totalApplications}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Pending</h2>
            <p className="text-4xl font-bold text-yellow-500 mt-3">
              {dashboard.pending}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Reviewed</h2>
            <p className="text-4xl font-bold text-purple-600 mt-3">
              {dashboard.reviewed}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Accepted</h2>
            <p className="text-4xl font-bold text-green-600 mt-3">
              {dashboard.accepted}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Rejected</h2>
            <p className="text-4xl font-bold text-red-600 mt-3">
              {dashboard.rejected}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow mt-10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <Link
              to="/create-job"
              className="bg-indigo-600 text-white rounded-lg p-5 text-center hover:bg-indigo-700"
            >
              Create Job
            </Link>

            <Link
              to="/my-jobs"
              className="bg-blue-600 text-white rounded-lg p-5 text-center hover:bg-blue-700"
            >
              My Jobs
            </Link>

            <Link
              to="/profile"
              className="bg-green-600 text-white rounded-lg p-5 text-center hover:bg-green-700"
            >
              Profile
            </Link>

            <Link
              to="/jobs"
              className="bg-purple-600 text-white rounded-lg p-5 text-center hover:bg-purple-700"
            >
              Browse Jobs
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;