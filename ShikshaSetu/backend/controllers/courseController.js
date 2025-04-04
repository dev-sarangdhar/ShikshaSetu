const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, faculty: req.user.id });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("faculty", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
