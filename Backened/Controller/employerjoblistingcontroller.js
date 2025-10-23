const employerjoblisting = require("../mongo/adminlogin/employerjoblisting");

const createJobListing = async (req, res) => {
  try {
    const {
      jobTitle,
      description,
      totalVacancies,
      location,
      qualifications,
      responsibilities,
      salaryRange
    } = req.body;

    // ✅ Validation
    if (!jobTitle || !description || !location || !qualifications || !responsibilities || !salaryRange) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create new job listing
    const jobListing = new employerjoblisting({
      admin: req.admin._id,   // Links job to the logged-in admin
      jobTitle,
      description,
      totalVacancies,
      location,
      qualifications,
      responsibilities,
      salaryRange
    });

    // ✅ Save to MongoDB
    await jobListing.save();

    // ✅ Success response
    res.status(201).json({ success: true, job: jobListing });

  } catch (error) {
    console.error("Error creating job listing:", error.message);
    res.status(500).json({ message: "Error creating job listing" });
  }
};

module.exports = { createJobListing };
