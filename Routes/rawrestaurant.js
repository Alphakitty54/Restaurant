
const Restaurant = require("../models/Restaurant");
const {
  verifyToken,
  verifyTokenAndAuthorization
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
  const newRestaurant = new Restaurant(req.body);

  try {
    const savedRestaurant = await newRestaurant.save();
    await processData(restaurantData);
    res.status(200).json(savedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id",  async (req, res) => {


  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id",  async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const Restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(Restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL USER
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Restaurants;

    if (qNew) {
      Restaurants = await Restaurant.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Restaurants = await Restaurant.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Restaurants = await Restaurant.find();
    }

    res.status(200).json(Restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;
