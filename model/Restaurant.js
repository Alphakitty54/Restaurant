const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true, unique: true },
  address: {
    building: { type: String },
    coord: { type: [Number], required: true },
    street: { type: String },
    zipcode: { type: String }
  },
  borough: { type: String },
  cuisine: { type: String },
  grades: [{
    date: { type: Date },
    grade: { type: String },
    score: { type: Number }
  }]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
