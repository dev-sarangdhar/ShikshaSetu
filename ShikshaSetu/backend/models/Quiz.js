const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
// This code defines a Mongoose schema for a Quiz model in a MongoDB database.
// The schema includes fields for title, course, faculty, and an array of questions.