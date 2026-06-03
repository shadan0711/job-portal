

const Category = require("../models/Category");
const Job = require("../models/Job");
const Application = require("../models/Application");
const mongoose = require("mongoose");



exports.createCategory = async (req, res) => {
    try {
        const { name, icon, vacancies } = req.body;
        if (!name || !icon) {
            return res.status(400).json({ success: false, message: "Category name and icon are required" });
        }
        
        const normalizedName = name.trim().toLowerCase();
        const existing = await Category.findOne({ name: normalizedName });
        if (existing) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const category = await Category.create({
            name: normalizedName,
            icon,
            vacancies: vacancies || 0
        });

        res.status(201).json({ success: true, message: "Category created smoothly!", category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("jobs");
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch categories" });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Check karo ki Category ID valid hai ya nahi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Category ID format" });
        }

        // 2. Category ko database mein dhoondo
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // 🔥 STEP 3: Sabse pehle is category se linked saare Jobs dhoondo
        const linkedJobs = await Job.find({ category: id });
        const jobIds = linkedJobs.map(job => job._id);

        if (jobIds.length > 0) {
            // Un saare jobs ki saari applications delete karo taaki junk na bache
            await Application.deleteMany({ jobId: { $in: jobIds } });
            
            // Phir us Category ke andar ke SAARE JOBS KO DELETE KARO
            await Job.deleteMany({ category: id });
            console.log(`Deleted ${jobIds.length} jobs linked to this category.`);
        }

        // 4. Jab saare jobs aur applications delete ho jayein, tab main Category ko delete karo
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category aur uske andar ke saare jobs successfully delete ho gaye hain! 🗑️"
        });
    } catch (error) {
        console.error("Category Delete Error:", error);
        res.status(500).json({ success: false, message: "Internal server error during deletion" });
    }
};