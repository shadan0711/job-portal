

const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getAdminStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const jobsCount = await Job.countDocuments();
        const appsCount = await Application.countDocuments();
        const applications = await Application.find().populate("jobId").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            stats: { users: usersCount, jobs: jobsCount, apps: appsCount },
            applications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};