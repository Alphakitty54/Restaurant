const express = require("express");
const router = express.Router();
const ReviewedRestaurant = require("../model/ReviewedRestaurant");
const Neighbour = require("../model/Neighbourhood");


router.get("/find", async (req, res) => {
  const { latitude, longitude } = req.query;
  let matchedRestaurants = [];

  try {
    // Find the matching coordinate in the Neighbour table
    const neighbours = await Neighbour.find().exec();
    let matchedCoordinate = null;
    for (const neighbour of neighbours) {
      for (const coordinate of neighbour.geometry.coordinates) {
        const [lon, lat] = coordinate;
        if (parseFloat(lat) === parseFloat(latitude) && parseFloat(lon) === parseFloat(longitude)) {
          matchedCoordinate = coordinate;
          break;
        }
      }
      if (matchedCoordinate) {
        break;
      }
    }

    // If a matching coordinate is found, search in the ReviewedRestaurant table
    if (matchedCoordinate) {
      const [a, b] = matchedCoordinate;
      const restaurants = await ReviewedRestaurant.find({
        $or: [
          { "location.latitude": a, "location.longitude": b },
          { "location.latitude": b, "location.longitude": a }
        ]
      }).exec();
      matchedRestaurants = restaurants;
    }

    res.json(matchedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
