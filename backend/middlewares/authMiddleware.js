
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || 
                      req.body?.token || 
                      req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            // Agar token nahi hai, toh req.user null set kardo (Page crash nahi hoga)
            req.user = null;
            return next(); 
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Auth Error" });
    }
};

// 2. IS STUDENT MIDDLEWARE
exports.isStudent = async (req, res, next) => {
    try {
        // Hamare data mein 'accountType' nahi 'role' hai
        // Hum req.user se role check kar sakte hain jo humne login/auth mein set kiya tha
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Students only",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

// 3. IS ADMIN MIDDLEWARE
exports.isAdmin = async (req, res, next) => {
    try {
        // Hamare data mein field ka naam 'role' hai
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin only",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};