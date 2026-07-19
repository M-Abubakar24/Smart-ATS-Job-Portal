const express = require("express");

const router = express.Router();

const {
  recruiterDashboard,
  jobseekerDashboard,
} = require("../controllers/dashboardController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Recruiter Dashboard
router.get(
  "/recruiter",
  protect,
  authorize("recruiter", "admin"),
  recruiterDashboard
);

// Jobseeker Dashboard
router.get(
  "/jobseeker",
  protect,
  authorize("jobseeker"),
  jobseekerDashboard
);

module.exports = router;