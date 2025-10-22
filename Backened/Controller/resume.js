const Personalresume = require("../mongo/userpersonal/userresume");

// ✅ POST Resume (upload + save)
const postresume = async (req, res) => {
  try {
    const {
      name,
      mobilenumber,
      email,
      address,
      education,
      experience,
      skills,
      hoobys,
    } = req.body;

    // ✅ Handle file uploads safely
    const resumeFile = req.files?.resume?.[0];
    const imageFile = req.files?.image?.[0];

    const resumeBase64 = resumeFile
      ? resumeFile.buffer.toString("base64")
      : null;
    const imageBase64 = imageFile ? imageFile.buffer.toString("base64") : null;

    // ✅ Create resume document
    const newResume = new Personalresume({
      user: req.user._id,
      resumeLink: resumeBase64, // store resume as base64
      image: imageBase64,       // store image as base64
      name,
      mobilenumber,
      email,
      address,
      education,
      experience,
      skills,
      hoobys,
    });

    await newResume.save();

    res
      .status(201)
      .json({ message: "✅ Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("❌ Error creating resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ GET all resumes for logged-in user
const getResume = async (req, res) => {
  try {
    const resumes = await Personalresume.find({ user: req.user._id });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "No resumes found" });
    }

    // ✅ Convert base64 to usable display URLs
    const formattedResumes = resumes.map((resume) => ({
      ...resume._doc,
      image: resume.image
        ? `data:image/jpeg;base64,${resume.image}`
        : null,
      resumeLink: resume.resumeLink
        ? `data:application/pdf;base64,${resume.resumeLink}`
        : null,
    }));

    res.status(200).json({ resumes: formattedResumes });
  } catch (error) {
    console.error("❌ Error fetching resumes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postresume, getResume };
