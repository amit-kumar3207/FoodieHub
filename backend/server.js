// Load Environment Variables
require("dotenv").config();

// Import Packages
const express = require("express");
const cors = require("cors");

// Import Order Routes
const orderRoutes = require("./routes/orderRoutes");

// Import Database Connection
const connectDB = require("./config/db");

// Create Express Application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Order Routes
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("FoodieHub Backend Server Running Successfully!");
});

// Define Port
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
