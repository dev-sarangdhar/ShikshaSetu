const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🔥 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());  // Security headers
app.use(morgan("dev")); // Logging HTTP requests

// 🔒 Secure CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow only frontend URL
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// 🚀 API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes")); // Changed to lowercase for consistency

// 🌐 Serve Static Files (For Deployment)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/dist"));
    app.get("*", (req, res) => {
        res.sendFile(__dirname + "/frontend/dist/index.html");
    });
}

// 🌍 Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Welcome to ShikshaSetu API");
});

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
