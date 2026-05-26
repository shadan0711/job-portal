// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     salary: { type: String, required: true },
//     location: { type: String, required: true },
//     jobType: { type: String, required: true }, // Full-Time, Part-Time
//     description: { type: String, required: true },
//     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true }, 
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // YAHAN ARRAY ADD KAREIN:
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);