/////////////////////
//Import dependancies
////////////////////
require("dotenv").config();
const mongoose = require("mongoose");

/////////////////////
//Establish connection
////////////////////

//grab url fron .env

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

//connection events
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected to Mongoose"))
  .on("error", (error) => console.log(error));

/////////////////////
//Export connection
////////////////////

module.exports = mongoose;
