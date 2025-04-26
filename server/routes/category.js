const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategories,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/category");
const { verifyToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, isAdmin, createCategory);
router.get("/", getCategories);
router.patch("/:id", verifyToken, isAdmin, updateCategory);
router.get("/:slug", getSingleCategory);
router.delete("/:id",deleteCategory)

module.exports = router;
