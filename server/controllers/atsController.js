const User = require("../models/User");
const pdf = require("pdf-parse");
const axios = require("axios");
const analyzeResumeText = require("../utils/resumeAnalyzer");

const analyzeResume = async (req, res) => {
  try {
    // Find logged-in user
    const user = await User.findById(req.user._id);

    if (!user || !user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first.",
      });
    }

    // Download resume from Cloudinary
    const response = await axios.get(user.resume, {
      responseType: "arraybuffer",
    });

    // Extract text from PDF
    const pdfData = await pdf(Buffer.from(response.data));

const resumeText = pdfData.text;
    // Analyze Resume
    const analysis = analyzeResumeText(resumeText);

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};