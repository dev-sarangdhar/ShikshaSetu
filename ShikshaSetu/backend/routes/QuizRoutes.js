const express = require("express");
const Quiz = require("../models/Quiz");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create Quiz (Only Faculty)
router.post("/", authMiddleware, roleMiddleware(["Faculty", "Admin"]), async (req, res) => {
    try {
        const { title, course, questions } = req.body;

        const quiz = new Quiz({ title, course, faculty: req.user.id, questions });
        await quiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔹 Get All Quizzes
router.get("/", authMiddleware, async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("faculty", "name email").populate("course", "title");
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
