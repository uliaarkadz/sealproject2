const Event = require("../models/Event");
const Runner = require("../models/Runner");
const moment = require("moment");

/////////////////
//Runners Routs
////////////////

// Index route - get runners
const index = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const runners = await Runner.find({ eventId });
    res.render("runners/index.ejs", { runners, eventId, moment });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

// New route - get new runner
const newRoute = (req, res) => {
  const eventId = req.params.eventId;
  res.render("runners/new.ejs", { eventId });
};

//Create route - post runner
const create = async (req, res) => {
  try {
    //get event id
    const eventId = req.params.eventId;
    req.body.eventId = eventId;
    //get event distance
    const event = await Event.findById(eventId);
    const unit = event.unit;
    let distance;

    switch (event.unit) {
      case "km":
        distance = event.distance / 1.609;
        break;
      case "m":
        distance = event.distance;
        break;
      default:
        console.log("Not valid inpit");
    }
    //calculate pace
    req.body.pace = myFunctions.calculatePace(
      req.body.finishTime,
      req.body.startTime,
      distance
    );
    req.body.dob = moment(req.body.dob).utc();
    await Runner.create(req.body);
    res.redirect(`/event/${req.params.eventId}/runners`);
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

// Edit route - get edit runner
const edit = async (req, res) => {
  try {
    const id = req.params.runnerId;
    const eventId = req.params.eventId;
    const runner = await Runner.findById(id);

    res.render("runners/edit.ejs", { runner, eventId, moment });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

//Update route - put runner

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const eventId = req.params.eventId;
    req.body.eventId = eventId;
    const event = await Event.findById(eventId);
    const unit = event.unit;
    let distance;

    switch (event.unit) {
      case "km":
        distance = event.distance / 1.609;
        break;
      case "m":
        distance = event.distance;
        break;
      default:
        console.log("Not valid inpit");
    }
    //calculate pace
    req.body.pace = myFunctions.calculatePace(
      req.body.finishTime,
      req.body.startTime,
      distance
    );
    req.body.dob = moment(req.body.dob).utc();
    await Runner.findByIdAndUpdate(id, req.body);
    res.redirect(`/runner/${eventId}/${id}`);
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

//Destroy route - delete event
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const eventId = req.params.eventId;
    console.log(eventId);
    await Runner.findByIdAndDelete(id);
    debugger;
    res.redirect(`/runner/${eventId}`);
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

//Show route - get runner by id
const show = async (req, res) => {
  try {
    const id = req.params.id;
    const eventId = req.params.eventId;
    const runner = await Runner.findById(id);
    res.render("runners/show.ejs", { runner, eventId });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

module.exports = { index, destroy, newRoute, edit, update, show, create };
