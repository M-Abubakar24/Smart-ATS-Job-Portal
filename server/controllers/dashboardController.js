const Job = require("../models/Job");
const Application = require("../models/Application");

// ===============================
// Recruiter Dashboard
// ===============================
const recruiterDashboard = async (req, res) => {
  try {
    // Jobs created by recruiter
    const jobs = await Job.find({
      recruiter: req.user._id,
    });

    const jobIds = jobs.map((job) => job._id);

    // Applications for recruiter's jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    });

    const dashboard = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter((job) => job.isActive).length,
      totalApplications: applications.length,

      pending: applications.filter(
        (app) => app.status === "Pending"
      ).length,

      reviewed: applications.filter(
        (app) => app.status === "Reviewed"
      ).length,

      accepted: applications.filter(
        (app) => app.status === "Accepted"
      ).length,

      rejected: applications.filter(
        (app) => app.status === "Rejected"
      ).length,
    };

    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Jobseeker Dashboard
// ===============================
const jobseekerDashboard = async (req, res) => {
  try {
    // Applications submitted by jobseeker
    const applications = await Application.find({
      applicant: req.user._id,
    });

    const dashboard = {
      totalApplications: applications.length,

      pending: applications.filter(
        (app) => app.status === "Pending"
      ).length,

      reviewed: applications.filter(
        (app) => app.status === "Reviewed"
      ).length,

      accepted: applications.filter(
        (app) => app.status === "Accepted"
      ).length,

      rejected: applications.filter(
        (app) => app.status === "Rejected"
      ).length,
    };

    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  recruiterDashboard,
  jobseekerDashboard,
};