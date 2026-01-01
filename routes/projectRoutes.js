const express = require("express");
const router = express.Router();

const {
  addProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectController");

// ADD PROJECT
router.post("/", addProject);

// GET ALL PROJECTS
router.get("/", getProjects);

// GET SINGLE PROJECT
router.get("/:id", getProjectById);

module.exports = router;
