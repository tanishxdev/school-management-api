const db = require("../config/db");
const calculateDistance = require("../utils/distance");

// Add School
exports.addSchool = (schoolData, callback) => {
  const { name, address, latitude, longitude } = schoolData;

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, address, latitude, longitude], callback);
};

// Get schools sorted by distance
exports.getSchools = (userLat, userLng, callback) => {
  const query = "SELECT * FROM schools";

  db.query(query, (err, results) => {
    if (err) return callback(err);

    // Calculate distance for each school
    const schoolsWithDistance = results.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        school.latitude,
        school.longitude,
      );

      return {
        ...school,
        distance,
      };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    callback(null, schoolsWithDistance);
  });
};
