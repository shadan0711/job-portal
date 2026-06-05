

const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, applyToJob } = require("../controllers/jobController");
const { auth, isAdmin, isStudent } = require("../middlewares/authMiddleware");

router.get("/alljobs", getAllJobs);
router.get("/getjob/:id", auth, getJobById);
router.post("/createjob", auth, isAdmin, createJob);
router.post("/apply/:id", auth, isStudent, applyToJob);

module.exports = router;