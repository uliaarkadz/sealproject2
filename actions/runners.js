const Event = require("../models/Event");
const Runner = require("../models/Runner");
const moment = require("moment");
const myFunctions = require("../utils/customFunctions");

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
const newRoute = async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  res.render("runners/new.ejs", { event });
};

//Create route - post runner
const create = async (req, res) => {
  try {
    //get event id
    const eventId = req.params.eventId;
    req.body.eventId = eventId;
    //get event distance
    const event = await Event.findById(eventId);
    //calculate pace
    req.body.pace = myFunctions.calculatePace(
      req.body.finishTime,
      req.body.startTime,
      event.distance,
      event.unit
    );
    req.body.netTime = myFunctions.convertNetTime(
      req.body.finishTime,
      req.body.startTime
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
    const event = await Event.findById(eventId);
    res.render("runners/edit.ejs", { runner, eventId, moment, event });
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

    //calculate pace
    req.body.pace = myFunctions.calculatePace(
      req.body.finishTime,
      req.body.startTime,
      event.distance,
      event.unit
    );

    req.body.netTime = myFunctions.convertNetTime(
      req.body.finishTime,
      req.body.startTime
    );

    req.body.dob = moment(req.body.dob).utc();
    console.log(req.body);
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
