const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geometry: {
    type: { type: String, default: 'Polygon' },
    coordinates: [[[Number]]]
  }
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
