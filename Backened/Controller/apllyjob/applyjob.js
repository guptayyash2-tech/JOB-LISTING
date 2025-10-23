const applyjob = require("../../mongo/adminlogin/applyjob");
const employerjoblisting = require("../../mongo/adminlogin/employerjoblisting");


// 📦 Apply for a Job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Check if job exists
    const job = await employerjoblisting.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Prevent duplicate applications
    const existingApplication = await applyjob.findOne({
      user: req.user._id,
      jobListing: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "You already applied for this job." });
    }

    // Create application
    const newApplication = new ApplyJob({
      admin: job.admin, // employer who posted the job
      user: req.user._id, // current logged-in user
      jobListing: jobId,
      resume: req.file.path,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Applied successfully!",
      application: newApplication,
    });
  } catch (error) {
    console.error("❌ Error applying for job:", error.message);
    res.status(500).json({ message: "Error applying for job" });
  }
};

// 📄 Get All Applications (for Admin)
const getAllApplicationsByAdmin = async (req, res) => {
  try {
    const applications = await ApplyJob.find({ admin: req.admin._id })
      .populate("user", "name email")
      .populate("jobListing", "jobTitle");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("❌ Error fetching applications:", error.message);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// 👤 Get Applications by User
const getUserApplications = async (req, res) => {
  try {
    const applications = await ApplyJob.find({ user: req.user._id })
      .populate("jobListing", "jobTitle location");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("❌ Error fetching user applications:", error.message);
    res.status(500).json({ message: "Error fetching user applications" });
  }
};

module.exports = {
  applyForJob,
  getAllApplicationsByAdmin,
  getUserApplications,
};
