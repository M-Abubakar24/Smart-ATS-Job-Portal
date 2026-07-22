const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      default: "Full-Time",
    },

    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      default: "Entry",
    },

    skills: [
      {
        type: String,
      },
    ],

   recruiter: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);