const Job = require("../models/Job");
const Application = require("../models/Application");
const cloudinary = require("cloudinary").v2;
const nodemailer = require('nodemailer');


// ADMIN: Create a new job
exports.createJob = async (req, res) => {
    try {
        const { title, salary, location, jobType, description } = req.body;
        const newJob = await Job.create({ title, salary, location, jobType, description });
        res.status(201).json({ success: true, message: "Job posted successfully", newJob });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            jobs // This returns the array inside a 'jobs' key
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs"
        });
    }
};

// exports.getJobById = async (req, res) => {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });
//     res.json(job);
// };

exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        let hasApplied = false;

        // Agar user login hai, toh check karo ki Application collection mein entry hai ya nahi
        if (req.user && req.user.id) {
            const existingApplication = await Application.findOne({
                jobId: id, // Ensure ki aapke Schema mein 'jobId' hi naam hai
                $or: [
                    { userId: req.user.id },
                    { email: req.user.email } // Safety check
                ]
            });
            
            if (existingApplication) {
                hasApplied = true;
            }
        }

        return res.status(200).json({
            success: true,
            job,
            hasApplied 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


exports.applyToJob = async (req, res) => {
    try {
        const { id } = req.params; // jobId
        const { fullName, email, phone, experience } = req.body;
        const userId = req.user.id; 

        // 1. Check if job exists
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // 2. FIXED: Check 'Application' Collection instead of 'Job' array
        // Isse delete karne par system ko pata chal jayega ki ab koi application nahi hai
        const existingApplication = await Application.findOne({
            jobId: id,
            $or: [{ email: email }, { userId: userId }] 
        });

        if (existingApplication) {
            return res.status(400).json({ 
                success: false, 
                message: "You have already applied for this job" 
            });
        }

        // 3. Resume Upload (Cloudinary)
        if (!req.files || !req.files.resume) {
            return res.status(400).json({ success: false, message: "Resume file is required" });
        }
        const file = req.files.resume;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Resumes",
            resource_type: "auto"
        });

        // 4. Create Application record
        const application = await Application.create({
            jobId: id,
            userId: userId, // Add this line in your Application Schema if not exists
            fullName,
            email,
            phone,
            experience,
            resumeUrl: result.secure_url
        });

        // 5. OPTIONAL: Job document update (Sirf record ke liye, check ke liye nahi)
        if (!job.applications.includes(userId)) {
            job.applications.push(userId);
            await job.save();
        }

        res.status(200).json({
            success: true,
            message: "Application submitted successfully!",
            application
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// 1. Email Transporter (Ensure this is correct)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rehanmallick297@gmail.com', // Aapka email
    pass: 'vkjplywfmzzocvos',      // Aapka App Password
  },
});

exports.applyJob = async (req, res) => {
  try {
    const { fullName, email, phone, experience } = req.body;
    const jobId = req.params.id;

    // Validation (Zaroori hai taaki empty data na jaye)
    if(!fullName || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // 2. Email Content Setup
    const mailOptions = {
      // 'from' hamesha wahi hona chahiye jo auth.user mein hai
      from: `"JOBFLOW Admin" <rehanmallick297@gmail.com>`, 
      
      // 'to' mein wo email daalein jahan aap notification receive karna chahte hain
      to: 'rehanmallick297@gmail.com', 
      
      subject: `📢 New Application: ${fullName} applied for Job ID ${jobId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 15px; overflow: hidden;">
          <div style="background: #0284c7; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Candidate Alert!</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #475569;">A new application has been submitted through the <strong>JOBFLOW</strong> portal.</p>
            
            <table style="width: 100%; margin-top: 20px;">
              <tr><td style="color: #64748b;"><strong>Candidate:</strong></td><td>${fullName}</td></tr>
              <tr><td style="color: #64748b;"><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td style="color: #64748b;"><strong>Phone:</strong></td><td>${phone}</td></tr>
              <tr><td style="color: #64748b;"><strong>Experience:</strong></td><td>${experience} Years</td></tr>
              <tr><td style="color: #64748b;"><strong>Job ID:</strong></td><td>${jobId}</td></tr>
            </table>
          </div>
        </div>
      `,
    };

    // 3. Send the Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: "Application submitted and Admin notified!" 
    });

  } catch (error) {
    // Isse aapko terminal mein asli wajah dikhegi (e.g. Invalid Login)
    console.error("Email Error Details:", error); 
    res.status(500).json({ 
      success: false, 
      message: "Server error occurred while sending email.",
      error: error.message 
    });
  }
};