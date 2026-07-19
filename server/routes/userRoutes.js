const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put(
  "/upload-resume",
  protect,
  authorize("jobseeker"),
  upload.single("resume"),
  uploadResume
);

module.exports = router;