const express = require("express");

const router = express.Router();

const {
  applyJob,
  getApplicantsForJob,
  getMyApplications,
  updateApplicationStatus,
  deleteApplication,
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
router.delete(
  "/:applicationId",
  protect,
  authorize("jobseeker"),
  deleteApplication
);

module.exports = router;