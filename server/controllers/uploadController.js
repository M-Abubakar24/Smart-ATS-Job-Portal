const User = require("../models/User");

const uploadResume = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Save Cloudinary URL to user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resume: req.file.path,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: user.resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};