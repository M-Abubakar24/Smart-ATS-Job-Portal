import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/recruiterService";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    employmentType: "Full-Time",
    experienceLevel: "Entry",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob({
        ...form,
        requirements: form.requirements
          .split(",")
          .map((item) => item.trim()),

        skills: form.skills
          .split(",")
          .map((item) => item.trim()),
      });

      alert("Job created successfully!");

      navigate("/my-jobs");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Create Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="company"
            placeholder="Company"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="5"
            required
          />

          <input
            name="requirements"
            placeholder="Requirements (comma separated)"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="employmentType"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>

          <select
            name="experienceLevel"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>

          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Create Job
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateJob;