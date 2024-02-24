const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const restaurantRoute = require("./Routes/rawrestaurant");
const app = express();

mongoose
.connect(process.env['mongodb'])
.then(() => console.log("DBConnextion Sucessful"))
.catch((err) => {
  console.log(err);
});


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("api/restaurants",restaurantRoute );
app.use("api/search/")
app.listen(process.env.PORT || 5000, () => {
  console.log('server is running');
});