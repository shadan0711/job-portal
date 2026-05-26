// const express = require("express");
// const app = express();
// const database = require("./config/database");
// const cors = require("cors");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser"); // Added this
// const fileUpload = require("express-fileupload"); // Add this for resumes


// dotenv.config();
// const PORT = process.env.PORT || 5000; // Match the 5000 from your frontend request

// // 1. Database Connect 
// // Make sure your database.js exports a function, not an object with a .connect property
// console.log("Database Import Content:", database);
// database.connect();

// // 2. Middlewares
// app.use(express.json()); // Body parser
// app.use(cookieParser()); // Necessary if you plan to use JWT in cookies
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Your React Port
//     credentials: true,
//   })
// )

// // 3. Cloudinary connection
// cloudinaryConnect();

// app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// // 4. Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/jobs", require("./routes/jobRoutes"));

// // Default Route
// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: 'Your server is up and running....'
//     });
// });

// app.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
// });

const express = require("express");
// const mongoose = require('mongoose')
const app = express();
const database = require("./config/database");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 5000;

// 1. Connect to Services
database.connect();
cloudinaryConnect();

// Routes import
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const adminRoutes = require("./routes/adminRoutes");

// 2. Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// This MUST be before routes to handle your resume uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// 3. Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "JOBFLOW server is up and running!",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});