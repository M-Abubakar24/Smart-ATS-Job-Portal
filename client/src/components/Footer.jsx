import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Company */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            Smart ATS
          </h2>

          <p className="mt-5 leading-7">
            A modern Applicant Tracking System helping job seekers
            optimize resumes, discover jobs, and connect with recruiters.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><a href="/" className="hover:text-indigo-400">Home</a></li>
            <li><a href="/jobs" className="hover:text-indigo-400">Jobs</a></li>
            <li><a href="/login" className="hover:text-indigo-400">Login</a></li>
            <li><a href="/register" className="hover:text-indigo-400">Register</a></li>
            <li><a href="/dashboard" className="hover:text-indigo-400">Dashboard</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <MdLocationOn className="text-indigo-400 text-xl" />
              <span>Lahore, Pakistan</span>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-indigo-400 text-xl" />
              <span>support@smartats.com</span>
            </div>

          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Newsletter
          </h3>

          <p className="mb-4">
            Subscribe to receive the latest job opportunities.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg text-black outline-none"
          />

          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold">
            Subscribe
          </button>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-2xl">

            <a href="#" className="hover:text-indigo-400">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-indigo-400">
              <FaLinkedin />
            </a>

            <a href="#" className="hover:text-indigo-400">
              <FaGithub />
            </a>

            <a href="#" className="hover:text-indigo-400">
              <FaInstagram />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p>
            © 2026 Smart ATS. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-indigo-400">
              Terms of Service
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;