const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getAdminStats = async (req, res) => {
    try {
        // 1. Fetch Counts for Stat Cards
        const userCount = await User.countDocuments();
        const jobCount = await Job.countDocuments();
        const appCount = await Application.countDocuments();

        // 2. Fetch Detailed Applications for the Table
        // Hum Application model se data layenge aur Job/User details populate karenge
        const allApplications = await Application.find()
            .populate("jobId", "title location") // Job ka title aur location
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            stats: {
                users: userCount,
                jobs: jobCount,
                apps: appCount
            },
            applications: allApplications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};