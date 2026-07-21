import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.fullName} 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Here's what's happening with your job search.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

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

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Applications
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-4">
              0
            </p>

            <p className="text-gray-500">
              Jobs Applied
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold">
              Saved Jobs
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-4">
              0
            </p>

            <p className="text-gray-500">
              Jobs Saved
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