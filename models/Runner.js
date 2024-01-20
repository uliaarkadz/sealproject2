//////////////////
//Impoert dep and connection
/////////////////

const mongoose = require("./connection");

////////////////////////
//CREATE FRUIT MODEL
///////////////////////
//destructure schema and model on os own variable
const { Schema, model } = mongoose;

const runnerSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  dob: Date,
  bib: Number,
  startTime: String,
  finishTime: String,
  netTime: String,
  pace: String,
  eventId: Schema.Types.ObjectId,
});

const Runner = model("Runner", runnerSchema);

module.exports = Runner;
