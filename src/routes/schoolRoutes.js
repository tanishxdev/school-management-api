const express = require("express");

const router = express.Router();

const schoolController = require("../controllers/schoolController");

// Add school API
router.post("/addSchool", schoolController.addSchool);

// List schools API
router.get("/listSchools", schoolController.listSchools);

module.exports = router;
