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

// Services Routes
const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

// Appointment Routes
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointment", appointmentRoutes);

// FAQ Routes
const faqRoutes = require("./routes/faqRoutes");
app.use("/api/faqs", faqRoutes);

const projectRoutes = require("./routes/projectRoutes");

app.use("/api/projects", projectRoutes);


app.use("/api/testimonials", require("./routes/testimonialRoutes"));




// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("🏡 Real Estate Backend API is running...");
});

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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
