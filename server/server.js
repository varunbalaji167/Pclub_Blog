const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoute");
const teamRoutes = require("./routes/teamRoute");

const app = express();
env.config();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

// Increase payload size limits
app.use(express.json({ limit: "10mb" })); // Adjust size as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/team", teamRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Atlas Database connected");
  })
  .catch((err) => {
    console.log(err);
  });