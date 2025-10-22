const express = require("express");
const multer = require("multer");
const adminRouter = express.Router();
const {
  adminregister,
  adminlogin,
  getadminprofile,
  updateadminprofile,
} = require("../../Controller/admincontroller");
const adminprotect = require("../../middlewear/adminmiddile");
const { createCompanyInformation, getCompanyInformationByUserId } = require("../../Controller/comapnycontroller");


// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
adminRouter.post("/adminregister", upload.single("userImage"), adminregister);
adminRouter.post("/adminlogin", adminlogin);
adminRouter.get("/admingetprofile", adminprotect, getadminprofile);
adminRouter.put("/adminupdateprofile", adminprotect,upload.single("userImage"), updateadminprofile);


adminRouter.post("/companycreate", adminprotect, createCompanyInformation);
adminRouter.get("/getcompanyinfo", adminprotect, getCompanyInformationByUserId);
module.exports = adminRouter;
