import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data.dashboard);
    } catch (error) {
  console.log(error.response);
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Failed to load dashboard.");
} finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.fullName} 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Here's what's happening with your job search.
        </p>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* ATS Score */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              ATS Score
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-4">
              --
            </p>

            <p className="text-gray-500">
              Analyze your resume
            </p>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Applications
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-4">
              {dashboard.totalApplications}
            </p>

            <p className="text-gray-500">
              Jobs Applied
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Pending
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-4">
              {dashboard.pending}
            </p>

            <p className="text-gray-500">
              Applications Pending
            </p>
          </div>

        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Reviewed
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              {dashboard.reviewed}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Accepted
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {dashboard.accepted}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Rejected
            </h2>

            <p className="text-4xl font-bold text-red-600 mt-4">
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
              to="/profile"
              className="bg-indigo-600 text-white rounded-lg p-5 text-center hover:bg-indigo-700"
            >
              Profile
            </Link>

            <Link
              to="/ats-analysis"
              className="bg-green-600 text-white rounded-lg p-5 text-center hover:bg-green-700"
            >
              ATS Analysis
            </Link>

            <Link
              to="/jobs"
              className="bg-blue-600 text-white rounded-lg p-5 text-center hover:bg-blue-700"
            >
              Browse Jobs
            </Link>

            <Link
              to="/applications"
              className="bg-purple-600 text-white rounded-lg p-5 text-center hover:bg-purple-700"
            >
              Applications
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;