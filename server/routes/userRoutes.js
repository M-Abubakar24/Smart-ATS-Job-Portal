const express = require("express");
const router = express.Router();

const { uploadResume } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.put(
  "/upload-resume",
  protect,
  authorize("jobseeker"),
  upload.single("resume"),
  uploadResume
);

module.exports = router;