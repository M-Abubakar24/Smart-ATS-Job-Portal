const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// =========================
// Public Routes
// =========================

// Public
router.get("/", getAllJobs);

// Recruiter
router.get(
  "/my",
  protect,
  authorize("recruiter", "admin"),
  getMyJobs
);

// Public
router.get("/:id", getJobById);

// Recruiter
router.post(
  "/",
  protect,
  authorize("recruiter", "admin"),
  createJob
);

router.put(
  "/:id",
  protect,
  authorize("recruiter", "admin"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorize("recruiter", "admin"),
  deleteJob
);
module.exports = router;