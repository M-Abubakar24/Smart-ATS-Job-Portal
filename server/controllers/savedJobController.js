const SavedJob = require("../models/SavedJob");
const Job = require("../models/Job");

// Save Job
const saveJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
  return res.status(403).json({
    success: false,
    message: "Only jobseekers can save jobs.",
  });
}

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const alreadySaved = await SavedJob.findOne({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Job already saved.",
      });
    }

    const savedJob = await SavedJob.create({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully.",
      savedJob,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      candidate: req.user._id,
    })
      .populate(
        "job",
        "title company location salary employmentType experienceLevel"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Saved Job
const removeSavedJob = async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      candidate: req.user._id,
      job: req.params.jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found.",
      });
    }

    await savedJob.deleteOne();

    res.status(200).json({
      success: true,
      message: "Saved job removed successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};