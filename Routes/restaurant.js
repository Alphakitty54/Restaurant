const Restaurant = require("../model/Restaurant");
const ReviewRestaurant = require("../model/RestaurantReview");

const processData = async (Restaurant) => {
  try {
    const rest_id = restaurant.restaurant_id;
    const name = restaurant.name;
    const cuisine = restaurant.cuisine;
    const borough = restaurant.address.borough;
    const latitude = restaurant.address.coord[0]; // Corrected index for latitude
    const longitude = restaurant.address.coord[1]; // Corrected index for longitude

    let total = 0;
    for (let i = 0; i < restaurant.grades.length; i++) { // Corrected "int" to "let" for loop variable
      let grade = restaurant.grades[i].grade; // Corrected "string" to "let" for grade variable
      let rate = 0;
      switch (grade) {
        case "A":
          rate = 5;
          break;
        case "B":
          rate = 4;
          break;
        case "C":
          rate = 3;
          break;
        case "D":
          rate = 2;
          break;
        case "F":
          rate = 1;
          break;
        default:
          rate = 0; // Removed "case" before "default"
          break;
      }
      total += rate;
    }
    const avgrate = total / restaurant.grades.length; // Corrected variable name
    const numberOfRatings = restaurant.grades.length; // Corrected variable name

    // Construct data for the new schema
    const newData = new ReviewRestaurant({ // Corrected "NewRestaurant" to "ReviewRestaurant"
      rest_id,
      name,
      desc: { borough, cuisine },
      location: { latitude, longitude },
      averageRating: avgrate, // Corrected variable name
      numberOfRatings // Corrected variable name
    });

    await newData.save();

    console.log('Data processed successfully!');
  } catch (error) {
    console.error('Error processing data:', error);
  }
};


module.exports = processData;