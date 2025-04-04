const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// 🔹 User Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("❌ User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        console.log("✅ User registered successfully:", user);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 🔹 User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        console.log("✅ User found:", user);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log("✅ Login Successful:", email);
        res.cookie("token", token, { httpOnly: true }).json({ message: "Login Successful", token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 🔹 User Logout
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    console.log("✅ User logged out");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
