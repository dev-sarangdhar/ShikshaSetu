const express = require("express");
const Assignment = require("../models/Assignment");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create Assignment (Only Faculty)
router.post("/", authMiddleware, roleMiddleware(["Faculty", "Admin"]), async (req, res) => {
    try {
        const { title, description, dueDate, course } = req.body;

        const assignment = new Assignment({ title, description, dueDate, course, faculty: req.user.id });
        await assignment.save();

        res.status(201).json({ message: "Assignment created successfully", assignment });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔹 Get All Assignments
router.get("/", authMiddleware, async (req, res) => {
    try {
        const assignments = await Assignment.find().populate("faculty", "name email").populate("course", "title");
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔹 Submit Assignment (Only Students)
router.post("/:id/submit", authMiddleware, roleMiddleware(["Student"]), async (req, res) => {
    try {
        const { fileUrl } = req.body;
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        assignment.submissions.push({ student: req.user.id, fileUrl });
        await assignment.save();

        res.json({ message: "Assignment submitted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
