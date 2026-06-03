const User = require("../models/User");
const Profile = require("../models/Profile");


// Get User Details (For Profile Page)
exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id; // Auth middleware se aayegi
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        
        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            userDetails,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
      age = ""
    } = req.body;

    const id = req.user.id;

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User entry not found" });
    }

    // FullName upadate section
    if (fullName) {
      userDetails.fullName = fullName;
      await userDetails.save();
    }

    let profileId = userDetails.additionalDetails;
    let profile;

    if (profileId) {
      profile = await Profile.findById(profileId);
    }

    // 🔥 SAFE CHECK: Agar kisi wajah se database mein profile record missing ho toh crash na karein, naya bana dein
    if (!profile) {
      profile = new Profile({});
      userDetails.additionalDetails = profile._id;
      await userDetails.save();
    }

    // Sync field modifications safely
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth || "";
    profile.about = about || profile.about || "";
    profile.contactNumber = contactNumber || profile.contactNumber || "";
    profile.gender = gender || profile.gender || "";
    profile.age = age || profile.age || "";

    await profile.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userDetails: updatedUserDetails, // React component expectations context
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR LOG:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile. Please try again.",
      error: error.message,
    });
  }
};