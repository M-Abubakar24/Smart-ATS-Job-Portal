const User = require("../models/User");
const resumeAnalyzer = require("../utils/resumeAnalyzer");

const analyzeResume = async (req, res) => {
  try {
    // Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user.resumeText) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first.",
      });
    }

    // Analyze resume text
    const analysis = resumeAnalyzer(user.resumeText);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};