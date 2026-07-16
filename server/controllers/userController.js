const User = require("../models/User");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resume: req.file.path, // Cloudinary URL
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: user.resume,
      user,
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