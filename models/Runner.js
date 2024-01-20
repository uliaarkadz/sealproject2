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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dob: Date,
  bib: Number,
  startTime: String,
  finishTime: String,
  netTime: String,
  pace: String,
  eventId: Schema.Types.ObjectId,
});

runnerSchema.index({ bib: 1, eventId: 1 }, { unique: true });
const Runner = model("Runner", runnerSchema);

module.exports = Runner;
