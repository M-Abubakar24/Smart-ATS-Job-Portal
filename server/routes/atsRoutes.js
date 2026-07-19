const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/atsController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/analyze-resume",
  protect,
  authorize("jobseeker"),
  analyzeResume
);

module.exports = router;