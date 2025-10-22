const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getuserprofile, login, register, updateuserprofile } = require("../../Controller/Usercontroller");
const protect = require("../../middlewear/usermiddle");

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/usergetprofile", protect, getuserprofile);
router.put("/userupdateprofile", protect, updateuserprofile);

module.exports = router;
