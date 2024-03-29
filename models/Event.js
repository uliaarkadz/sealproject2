//////////////////
//Impoert dep and connection
/////////////////

const mongoose = require("./connection");

////////////////////////
//CREATE FRUIT MODEL
///////////////////////
//destructure schema and model on os own variable
const { Schema, model } = mongoose;

//Schema - data shape
const eventSchema = new Schema({
  eventName: String,
  description: String,
  distance: Number,
  unit: String,
  date: Date,
  isActive: Boolean,
});

//Model - object for interactiong with DB
const Event = model("Event", eventSchema);

////////////////////////
//Export FRUIT MODEL
///////////////////////
module.exports = Event;
