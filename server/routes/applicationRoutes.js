const express = require("express");

const router = express.Router();

const {
  applyJob,
  getApplicantsForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/job/:jobId",
  protect,
  authorize("recruiter", "admin"),
  getApplicantsForJob
);
router.get(
  "/my",
  protect,
  authorize("jobseeker"),
  getMyApplications
);
router.post(
  "/:jobId",
  protect,
  authorize("jobseeker"),
  applyJob
);
router.put(
  "/:applicationId/status",
  protect,
  authorize("recruiter", "admin"),
  updateApplicationStatus
);

module.exports = router;