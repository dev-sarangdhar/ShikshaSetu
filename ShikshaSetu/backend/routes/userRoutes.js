const express = require("express");
const router = express.Router(); // ✅ Add this line

const User = require("../models/User");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, { httpOnly: true }).json({ message: "Login Successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
