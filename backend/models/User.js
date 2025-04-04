const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty", "admin"], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
// This code defines a Mongoose schema for a User model in a MongoDB database.
// The schema includes fields for name, email, password, role, and createdAt timestamp.