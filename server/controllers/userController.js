const User = require("../models/User");

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      location,
      experience,
      skills,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (location) user.location = location;

    if (experience !== undefined)
      user.experience = experience;

    if (skills)
      user.skills = skills;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
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
  getProfile,
  updateProfile,
  uploadResume,
};