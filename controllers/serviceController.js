const Service = require("../models/Service");

// GET all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new service
exports.createService = async (req, res) => {
  try {
    const { title, shortDesc, description, image, features, amenities } = req.body;

    const newService = new Service({
      title,
      shortDesc,
      description,
      image,
      features,
      amenities,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
