const User = require("../models/User");
const axios = require("axios");
const pdf = require("pdf-parse");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Download PDF from Cloudinary
    const response = await axios.get(req.file.path, {
      responseType: "arraybuffer",
    });

    // Extract text
    const pdfData = await pdf(Buffer.from(response.data));

    // Save URL + extracted text
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resume: req.file.path,
        resumeText: pdfData.text,
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
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};