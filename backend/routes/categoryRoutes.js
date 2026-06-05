
const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories,deleteCategory } = require("../controllers/categoryController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post("/create", auth, isAdmin, createCategory);
router.get("/all", getAllCategories);
router.delete("/delete/:id", deleteCategory);

module.exports = router;