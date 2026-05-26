

const express = require("express");
const router = express.Router();

// Controllers import karein
const { login, signup, sendotp, changePassword } = require("../controllers/authController");
const { updateProfile, getUserDetails } = require("../controllers/Profile");
const { auth } = require("../middlewares/authMiddleware");

// Routes define karein
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword);
router.post("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);

module.exports = router;