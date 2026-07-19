const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  matchResume,
} = require("../controllers/jobMatchController");

router.post(
  "/match",
  protect,
  authorize("jobseeker"),
  matchResume
);

module.exports = router;