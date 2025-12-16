const express = require("express");
const router = express.Router();

// FIXED ADMIN LOGIN DETAILS
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";  // You can set anything

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login Successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
});

module.exports = router;
