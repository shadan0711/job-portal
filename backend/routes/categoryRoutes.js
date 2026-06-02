
const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create", auth, isAdmin, createCategory);
router.get("/all", getAllCategories);

module.exports = router;