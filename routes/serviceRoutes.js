const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController"); // path corrected

// GET all services
router.get("/", serviceController.getServices);

// POST new service
router.post("/", serviceController.createService);

module.exports = router;
