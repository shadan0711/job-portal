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
    // 1. Destructure data from req.body (Aapke data fields ke mutabiq)
    const {
      fullName,
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
      age = ""
    } = req.body;

    // 2. User ID fetch karein (Auth Middleware se aayegi)
    const id = req.user.id;

    // 3. User details aur link ki gayi Profile dhoondein
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profile = await Profile.findById(profileId);

    // 4. User Model update karein (fullName update karne ke liye)
    // Hum sirf tabhi update karenge agar body mein fullName bheja gaya ho
    if (fullName) {
      userDetails.fullName = fullName;
      await userDetails.save();
    }

    // 5. Profile Model update karein
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.contactNumber = contactNumber || profile.contactNumber;
    profile.gender = gender || profile.gender;
    profile.age = age || profile.age;

    // 6. Updated Profile save karein
    await profile.save();

    // 7. Final updated data fetch karein taaki frontend ko refresh data mile
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile. Please try again.",
      error: error.message,
    });
  }
};