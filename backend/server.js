const mongoose = require("mongoose");

const orderRoutes = require("./routes/orderRoutes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("ShopEase Backend is Running!");
});

// Connect MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
