const express = require("express");
const router = express.Router();
const { getAdminStats,deleteApplication } = require("../controllers/adminController");
const { auth, isAdmin } = require("../middlewares/authMiddleware"); // Middleware zaroori hai
// Ye route hona chahiye
router.get("/stats", auth, isAdmin, getAdminStats);
router.delete(
  "/application/:id",
  auth,
  isAdmin,
  deleteApplication
);
module.exports = router;