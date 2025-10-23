
const createCompanyInformation = async (req, res) => {
  try {
    const {
      companyname,
      companyEmail,
      companyPhone,
      website,
      address,
      city,
      pincode,
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone
    } = req.body;

    // Check if company info already exists for this admin
    let existingCompany = await companyinformation.findOne({ admin: req.admin._id });
    if (existingCompany) {
      return res.status(400).json({ message: "Company information already exists" });
    }

    const companyInfo = new companyinformation({
      admin: req.admin._id,
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
    res.status(201).json({ company: companyInfo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating company information" });
  }
};