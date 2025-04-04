const express = require("express");
const Course = require("../models/Course");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create Course (Only Faculty)
router.post("/", authMiddleware, roleMiddleware(["Faculty", "Admin"]), async (req, res) => {
    try {
        const { title, description } = req.body;

        const course = new Course({ title, description, faculty: req.user.id });
        await course.save();

        res.status(201).json({ message: "Course created successfully", course });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔹 Get All Courses
router.get("/", authMiddleware, async (req, res) => {
    try {
        const courses = await Course.find().populate("faculty", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
// Compare this snippet from ShikshaSetu/backend/models/Course.js:
const mongoose = require("mongoose");