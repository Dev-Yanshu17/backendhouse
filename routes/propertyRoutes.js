const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
} = require("../controllers/propertyController");

// GET all properties
router.get("/", getAllProperties);

// GET single property
router.get("/:id", getPropertyById);

// POST new property
router.post("/", createProperty);

module.exports = router;
