//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = requie("method-override");
const mongoose = require("mongoose");

//get .envvariable
const { PORT, DATABASE_URL } = process.env;

//db connection
mongoose.connect(DATABASE_URL);
mongoose.connection
  .on("open", () => console.log("Conected to mongoose"))
  .on("close", () => console.log("Disconected to mongoose"))
  .on("error", (error) => console.log(error));

//app obj

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("It's Working");
});

// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
