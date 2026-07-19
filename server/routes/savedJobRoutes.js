const express = require("express");
const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:jobId", protect, saveJob);
router.get("/", protect, getSavedJobs);
router.delete("/:jobId", protect, removeSavedJob);

module.exports = router;