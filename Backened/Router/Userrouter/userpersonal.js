const express = require("express");
const userpersonalrouter = express.Router();
const multer = require("multer");
const {
  savePersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} = require("../../Controller/userpersonalinformation");
const protect = require("../../middlewear/usermiddle");
const { postresume, getResume } = require("../../Controller/resume");

    const storage = multer.memoryStorage();
const upload = multer({ storage });

// Personal Info Routes
userpersonalrouter.post("/savepersonalinfo", protect, savePersonalInfo);
userpersonalrouter.get("/getpersonalinfo", protect, getPersonalInfo);
userpersonalrouter.put("/updatepersonalinfo", protect, updatePersonalInfo);

// ✅ Allow both resume and image upload
userpersonalrouter.post(
  "/postresume",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  postresume
);

// Get all resumes
userpersonalrouter.get("/getresumes", protect, getResume);

module.exports = userpersonalrouter;
