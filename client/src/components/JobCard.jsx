import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <h3 className="text-2xl font-bold text-gray-800">
        {job.title}
      </h3>

      <p className="text-indigo-600 font-semibold mt-2">
        {job.company}
      </p>

      <div className="flex items-center gap-2 mt-4 text-gray-600">
        <FaMapMarkerAlt />
        <span>{job.location}</span>
      </div>

      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <FaBriefcase />
        <span>{job.type}</span>
      </div>

      <p className="mt-4 text-lg font-bold text-green-600">
        {job.salary}
      </p>

      <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
        Apply Now
      </button>

    </div>
  );
};

export default JobCard;