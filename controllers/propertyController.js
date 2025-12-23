const Property = require("../models/Property");

/**
 * @desc    Get all properties
 * @route   GET /api/properties
 * @access  Public
 */
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single property by ID
 * @route   GET /api/properties/:id
 * @access  Public
 */
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching property",
      error: error.message,
    });
  }
};

/**
 * @desc    Create new property
 * @route   POST /api/properties
 * @access  Public / Admin
 */
exports.createProperty = async (req, res) => {
  try {
    const {
      projectName,
      location,
      price,
      bedrooms,
      area,
      images,
    } = req.body;

    const property = new Property({
      projectName,
      location,
      price,
      bedrooms,
      area,
      images,
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create property",
      error: error.message,
    });
  }
};
