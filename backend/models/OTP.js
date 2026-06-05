

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60, // 5 minutes expiration
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from JobFlow",
            otpTemplate(otp)
        );
        console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending mails: ", error);
        throw error;
    }
}

// REMOVED 'next': Async functions in Mongoose pre-hooks 
// automatically wait for the promise to resolve.
OTPSchema.pre("save", async function () {
    console.log("New document saving process started for email:", this.email);

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    // No need to call next() here when using an async function
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;