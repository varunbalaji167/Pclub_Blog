const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const protect = require("../middleware/protect");

const router = express.Router();

// Use authMiddleware to verify token, then protect to check if user is authenticated
router.post("/", authMiddleware, protect, createBlog); // Only registered users
router.get("/", getAllBlogs); // Everyone can read
router.get("/:id", getBlog); // Everyone can read
router.put("/:id", authMiddleware, protect, updateBlog); // Only registered users
router.delete("/:id", authMiddleware, protect, deleteBlog); // Only registered users

module.exports = router;