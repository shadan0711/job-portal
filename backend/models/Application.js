

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
    resumeUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);