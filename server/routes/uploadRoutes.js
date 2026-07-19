const express = require("express");
const router = express.Router();

const { uploadResume } = require("../controllers/uploadController");

const upload = require("../middleware/upload");

const { protect } = require("../middleware/authMiddleware");


// Upload Resume
router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;