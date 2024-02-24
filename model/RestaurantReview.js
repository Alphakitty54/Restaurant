const mongoose = require("mongoose");

const restaurant = new mongoose.Schema({
 
  restaurant_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  desc: {
     borough: { type: String },
     cuisine: { type: String }
  },
  location: {
       latitude: { type: Number, required: true },
       longitude: { type: Number, required: true}
  },
  averageRating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 }
});

module.exports = mongoose.model("restaurant", restaurant);