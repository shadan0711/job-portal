
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// 1. SEND OTP
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const emailLower = email.toLowerCase();

        // 1. Format check
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailLower)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // 2. User existence check
        const checkUserPresent = await User.findOne({ email: emailLower });
        if (checkUserPresent) {
            return res.status(401).json({ success: false, message: "User already registered" });
        }

        // 3. Purane saare OTPs delete kar do is email ke liye (CRITICAL FIX)
        await OTP.deleteMany({ email: emailLower });

        // 4. Naya OTP generate karo
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // 5. Save to DB (Pre-save hook will send email)
        const otpPayload = { email: emailLower, otp };
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp, // Remove in production
        });
    } catch (error) {
        console.error("SEND OTP ERROR:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
// 2. SIGNUP
exports.signup = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, role, age, dob, otp } = req.body;
        const emailLower = email.toLowerCase();

        if (!fullName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({ success: false, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email: emailLower });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // 6. OTP Verification Logic
        const recentOtp = await OTP.findOne({ email: emailLower }).sort({ createdAt: -1 });

        console.log("Input OTP:", otp);
        console.log("DB OTP:", recentOtp ? recentOtp.otp : "None Found");

        if (!recentOtp || otp !== recentOtp.otp) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired OTP" 
            });
        }

        // 7. Hash Password and Create Profile
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: dob || null,
            age: age || null,
            about: null,
        });

        const user = await User.create({
            fullName,
            email: emailLower,
            password: hashedPassword,
            role: role || "Student",
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
        });

        return res.status(200).json({ 
            success: true, 
            message: "User registered successfully", 
            user 
        });
    } catch (error) {
        console.error("SIGNUP ERROR:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Registration failed", 
            error: error.message 
        });
    }
};

// 3. LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation: Check empty fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Fill all details" 
            });
        }

        const emailLower = email.toLowerCase();

        // 1. Database mein user check karein
        const user = await User.findOne({ email: emailLower }).populate("additionalDetails");
        
        // AGAR USER NAHI MILA: Specific message for Frontend Toast
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found. Please signup first" 
            });
        }

        // 2. Password compare karein
        if (await bcrypt.compare(password, user.password)) {
            // Token generate karein
            const token = jwt.sign(
                { email: user.email, id: user._id, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: "24h" }
            );

            user.token = token;
            user.password = undefined; // Security ke liye password remove kiya

            // Cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // Success Response
            res.cookie("token", token, options).status(200).json({ 
                success: true, 
                token, 
                user, 
                message: "Logged in successfully" 
            });

        } else {
            // Agar password galat hai
            return res.status(401).json({ 
                success: false, 
                message: "Password incorrect" 
            });
        }

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Login failure, please try again" 
        });
    }
};

// 4. CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id);
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "Passwords mismatch" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Old password wrong" });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Update failed" });
    }
};