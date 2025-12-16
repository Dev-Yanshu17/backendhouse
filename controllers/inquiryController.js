const Inquiry = require("../models/Inquiry");

exports.createInquiry = async (req, res) => {
  try {
    const { serviceName, name, email, phone, location } = req.body;

    if (!serviceName) {
      return res.status(400).json({ message: "Service name is required" });
    }

    const inquiry = new Inquiry({
      serviceName,
      name,
      email,
      phone,
      location,
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
