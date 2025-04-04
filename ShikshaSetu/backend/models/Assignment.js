const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    submissions: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        fileUrl: { type: String },
        submittedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
// This code defines a Mongoose schema for an Assignment model in a MongoDB database.
// The schema includes fields for title, description, due date, course, faculty, and submissions.