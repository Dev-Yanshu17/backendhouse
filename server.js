const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Contact Routes
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

// Admin Auth Routes
// const adminAuthRoute = require("./routes/adminAuth");
// app.use("/api/admin", adminAuthRoute);

// Services Routes
const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointment", appointmentRoutes);

// User Auth Routes
// app.use("/api/user", require("./routes/userAuth"));

// ✅ Property Routes (NEW)
const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("Real Estate Backend API is running...");
});

app.use("/api/faqs", require("./routes/faqRoutes"));

// ================= DATABASE =================
mongoose
  .connect("mongodb://127.0.0.1:27017/realestate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
