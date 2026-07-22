const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements,
      location,
      salary,
      employmentType,
      experienceLevel,
      skills,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      location,
      salary,
      employmentType,
      experienceLevel,
      skills,
      recruiter: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      employmentType,
      experienceLevel,
      minSalary,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

   let query = {
  isActive: true
};

    // Search by title or company
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by location
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Filter by employment type
    if (employmentType) {
      query.employmentType = employmentType;
    }

    // Filter by experience level
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    // Minimum salary
    if (minSalary) {
      query.salary = {
        $gte: Number(minSalary),
      };
    }

    let sortOption = {};

    switch (sort) {
      case "salary":
        sortOption = { salary: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const jobs = await Job.find(query)
      .populate("recruiter", "fullName email")
      .sort(sortOption)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / Number(limit)),
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "recruiter",
      "fullName email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only the recruiter who created the job or an admin can update it
    if (
      job.recruiter.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (
      job.recruiter.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Recruiter's Jobs
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
};
