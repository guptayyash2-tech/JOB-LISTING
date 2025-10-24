const employerjoblisting = require("../../mongo/adminlogin/employerjoblisting");
const ApplyJob = require("../../mongo/adminlogin/applyjob");


// 📝 Apply for a Job (no resume required)
const applyForJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    // Check if job exists
    const job = await employerjoblisting.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user already applied
    const alreadyApplied = await ApplyJob.findOne({
      user: userId,
      jobListing: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "You already applied for this job." });
    }

    // Create new application (no resume)
    const newApplication = new ApplyJob({
      user: userId,
      jobListing: jobId,
      admin: job.admin, // Assuming each job has an admin/creator field
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
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
