const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const jobMatchRoutes = require("./routes/jobMatchRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/ats", require("./routes/atsRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/job-match", jobMatchRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ATS Job Portal API Running",
  });
});

module.exports = app;