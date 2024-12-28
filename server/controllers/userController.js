// server/controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

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

// forgotPassword controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Construct the reset URL (ensure it's correct)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`; // This URL should match the frontend's URL format

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`
    };
    
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error processing the password reset request", error: error.message });
  }
};


// server/controllers/userController.js

// resetPassword controller
exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Token is part of the URL
  const { newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user.email); // Add logging for debugging

    user.password = newPassword;
    await user.save();

    console.log("Password successfully updated for user:", user.email);
    return res.status(200).json({ message: "Password successfully updated" });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};