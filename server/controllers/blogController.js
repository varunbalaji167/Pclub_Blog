const Blog = require("../models/blogModel");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthorized: Please log in to create blogs." });
    }
    const blog = await Blog.create({
      title,
      content,
      author_Id: req.userId,
      author:req.userData.name
    });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Check if logged-in user is the author
    if (blog.author_Id.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to update this blog." });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  console.log("Blog ID from URL:", req.params.id);
  console.log("User ID from Token:", req.userId);

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ensure the logged-in user is the author
    if (blog.author_Id.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to delete this blog." });
    }

    // Use deleteOne or delete() instead of remove()
    await blog.deleteOne();  // or blog.delete() depending on the method you prefer
    
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(400).json({ error: error.message });
  }
};