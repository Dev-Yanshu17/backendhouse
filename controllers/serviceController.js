const Service = require("../models/Service");

// GET all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ id: 1 });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new service
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({
      message: "Invalid service data",
      error: err.message
    });
  }
};
