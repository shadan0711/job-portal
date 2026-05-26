

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["Student", "Admin"], 
        default: "Student" 
    },
    // Linking to Profile Model
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile", // Ye wahi naam hai jo Profile.js mein export kiya hai
    },
    image: { type: String },
    token: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);