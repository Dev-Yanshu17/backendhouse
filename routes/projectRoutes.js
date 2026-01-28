const express = require("express");
const router = express.Router();

const {
  addProject,
  getProjects,
  getProjectById,
  getProjectsByStatus,
} = require("../controllers/projectController");

// ADD PROJECT
router.post("/", addProject);

// GET ALL PROJECTS
router.get("/", getProjects);

// GET PROJECTS BY STATUS
router.get("/status/:status", getProjectsByStatus);

// GET SINGLE PROJECT BY ID
router.get("/:id", getProjectById);

module.exports = router;
