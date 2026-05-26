const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: Number, required: true },
    resumeUrl: { type: String, required: true }, // Cloudinary Link
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);