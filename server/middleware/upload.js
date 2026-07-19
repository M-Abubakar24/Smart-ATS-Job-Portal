const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ai-job-portal/resumes",
    resource_type: "raw", // allows PDF uploads
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });

module.exports = upload;