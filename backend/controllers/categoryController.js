

const Category = require("../models/Category");

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