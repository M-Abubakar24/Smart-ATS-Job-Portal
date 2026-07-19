const User = require("../models/User");
const axios = require("axios");
const pdf = require("pdf-parse");

const matchResumeWithJob = require("../utils/jobMatcher");

const matchResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user || !user.resume) {
      return res.status(400).json({
        success: false,
        message: "Upload a resume first.",
      });
    }

    const response = await axios.get(user.resume, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdf(Buffer.from(response.data));

    const result = matchResumeWithJob(
      pdfData.text,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { matchResume };