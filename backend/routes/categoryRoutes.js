const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");

// Create Category
router.post("/create", createCategory);

// Get All Categories
router.get("/all", getAllCategories);

// Delete Category
router.delete("/delete/:id", deleteCategory);

module.exports = router;