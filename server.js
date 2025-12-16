const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Contact Routes
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

// Admin Auth Routes
const adminAuthRoute = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoute);

// Services Routes
const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

// =========================================

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/realestate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
