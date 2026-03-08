const schoolService = require("../services/schoolService");

// Add school controller
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  schoolService.addSchool(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    res.json({
      message: "School added successfully",
    });
  });
};

// List schools
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      error: "Latitude and longitude required",
    });
  }

  schoolService.getSchools(latitude, longitude, (err, schools) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    res.json(schools);
  });
};
