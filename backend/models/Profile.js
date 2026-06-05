const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female", "Other", null],
        default: null
    },
    dateOfBirth: {
        type: String, // String ya Date, aapki pasand
        default: null
    },
    about: {
        type: String,
        trim: true,
        default: null
    },
    contactNumber: {
        type: Number,
        trim: true,
        default: null
    },
    age: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model("Profile", profileSchema);