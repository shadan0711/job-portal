
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true, default: "Zap" },
    vacancies: { type: Number, default: 0 },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);