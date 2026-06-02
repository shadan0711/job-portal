
const Category = require("../models/Category"); // 🔥 CORRECTION: Yeh line exact aisi honi chahiye!
const mongoose = require('mongoose');

const Job = require("../models/Job");
const Application = require("../models/Application");
const cloudinary = require("cloudinary").v2;
const nodemailer = require('nodemailer');

exports.createJob = async (req, res) => {
    try {
        const { title, salary, location, jobType, description, category } = req.body;

        if (!title || !salary || !location || !jobType || !description || !category) {
            return res.status(400).json({ success: false, message: "All form fields are strictly mandatory" });
        }

        const targetCategory = await Category.findById(category);
        if (!targetCategory) {
            return res.status(444).json({ success: false, message: "Target category missing" });
        }

        // Forcefully ensure category is stored as a valid ObjectId
        const newJob = await Job.create({
            title, 
            salary, 
            location, 
            jobType, 
            description, 
            category: new mongoose.Types.ObjectId(category), 
            postedBy: req.user?.id
        });

        // Push job to category list array tracking
        if (!targetCategory.jobs) targetCategory.jobs = [];
        targetCategory.jobs.push(newJob._id);
        targetCategory.vacancies = (targetCategory.vacancies || 0) + 1;
        await targetCategory.save();

        res.status(201).json({ success: true, message: "Job uploaded and synchronized with Category successfully!", newJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        // Dynamic deep populate call stack logic
        const jobs = await Job.find().populate("category").sort({ createdAt: -1 });
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Object Identifier" });
        }

        const job = await Job.findById(id).populate("category");
        if (!job) return res.status(404).json({ success: false, message: "Job entry missing" });

        let hasApplied = false;
        if (req.user && req.user.id) {
            const applied = await Application.findOne({ jobId: id, userId: req.user.id });
            if (applied) hasApplied = true;
        }

        res.status(200).json({ success: true, job, hasApplied });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, age, experience } = req.body;
        const userId = req.user.id;

        if (!fullName || !email || !phone || !age || !experience) {
            return res.status(400).json({ success: false, message: "All data parameters are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid key format" });
        }

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        const alreadyApplied = await Application.findOne({ jobId: id, userId });
        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: "Already applied" });
        }

        if (!req.files || !req.files.resume) {
            return res.status(400).json({ success: false, message: "Resume document file is required" });
        }

        const file = req.files.resume;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Resumes", resource_type: "auto"
        });

        const application = await Application.create({
            jobId: id, userId, fullName, email, phone, age, experience, resumeUrl: result.secure_url
        });

        if (!job.applications.includes(userId)) {
            job.applications.push(userId);
            await job.save();
        }

        const mailOptions = {
            from: `"JOBFLOW Alerts" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_USER || 'rehanmallick297@gmail.com',
            subject: `📢 Application Received: ${fullName} applied for ${job.title}`,
            html: `<p><b>Role:</b> ${job.title}</p><p><a href="${result.secure_url}">Download CV Document</a></p>`
        };
        try { await transporter.sendMail(mailOptions); } catch(e) { console.log(e); }

        res.status(200).json({ success: true, message: "Application submitted smoothly!", application });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal application handler failure" });
    }
};