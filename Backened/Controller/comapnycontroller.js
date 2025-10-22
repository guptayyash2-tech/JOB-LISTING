const companyinformation = require("../mongo/adminlogin/company");


const createCompanyInformation = async (data) => {
  try {
    const { companyname, companyEmail, companyPhone, website, address, city, pincode, contactPersonName, contactPersonEmail, contactPersonPhone } = req.body;
    let companyinfo = await companyinformation.findOne({ admin: req.admin._id });

    const companyInfo = new companyinformation({
      admin: companyinfo._id,
      companyName: companyname,
      companyEmail,
      companyPhone,
      website,
      address,
      city,
      pincode,
      contactPersonName,
      contactPersonEmail, 
      contactPersonPhone
    });

    await companyInfo.save();
    return companyInfo;
  } catch (error) {
    throw new Error("Error creating company information");
  }
};

// Get Company Information by User ID
const getCompanyInformationByUserId = async (req, res) => {
  try {
    const userInfo = await companyinformation.findOne({ admin: req.admin._id }).populate(
      "Admin",
      "pancard officeemailid mobilenumber"
    );

    if (!userInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }

    // Wrap in 'user' key for frontend consistency
    res.status(200).json({ user: userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createCompanyInformation, getCompanyInformationByUserId };