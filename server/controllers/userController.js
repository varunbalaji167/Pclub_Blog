// server/controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// To register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    const userDetails = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    res.status(201).json({ message: "User registered successfully", user: userDetails });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// To login by a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("Logged in user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name:user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send both user and token in a single json response
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token, // Include the token here
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


exports.userDetails = async (req, res) => {
  try {
      const userId = req.userId; // Retrieved from the middleware
      const user = await User.findById(userId).select("-password"); // Exclude sensitive data

      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send({ user });
  } catch (error) {
      res.status(500).send({ message: "Error fetching user details", error: error.message });
  }
};