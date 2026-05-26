

const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, getJobById, applyToJob, applyJob } = require("../controllers/jobController");
const { auth, isAdmin, isStudent } = require("../middlewares/authMiddleware");


// Public Routes (Sab dekh sakte hain)
router.get("/alljobs", getAllJobs);
router.get("/getjob/:id",auth, getJobById);

// Admin Routes (Sirf Admin job post kar sakta hai)
router.post("/createjob", auth, isAdmin, createJob);

// Student Routes (Sirf Student apply kar sakta hai)
router.post("/apply/:id", auth, isStudent, applyToJob); // Cloudinary upload logic ke saath
router.post("/apply-notify/:id", applyJob); // Email notification wala logic

module.exports = router;