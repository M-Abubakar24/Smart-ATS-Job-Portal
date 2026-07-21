import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "jobseeker",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending:", formData);

const data = await registerUser(formData);

console.log("Response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(error.response?.data?.message || "Registration Failed");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join Smart ATS today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">

          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <FaLock className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <FaPhone className="text-gray-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="03XXXXXXXXX"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label>Location</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <FaMapMarkerAlt className="text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Lahore, Pakistan"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-indigo-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;