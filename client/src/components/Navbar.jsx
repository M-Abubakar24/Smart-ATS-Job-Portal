import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          Smart ATS
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-700 hover:text-indigo-600"
          >
            Jobs
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;