//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const Event = require("./models/Event");
const Runner = require("./models/Runner");
const moment = require("moment");
const myFunctions = require("./utils/customFunctions");

//get .envvariable
const { PORT, DATABASE_URL } = process.env;

//db connection

//app obj

const app = express();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use((req, res, next) => {
//   res.locals.moment = moment;
//   next();
// });

// routes

/////////////////
//Event Routs
////////////////

app.get("/", (req, res) => {
  res.send("It's Working");
});

// Index route - get events
app.get("/event", async (req, res) => {
  const event = await Event.find({});
  res.render("events/index.ejs", { event, moment });
});

// New route - post event
app.get("/event/new", (req, res) => {
  res.render("events/new.ejs");
});

//Create route - post event
app.post("/event", async (req, res) => {
  console.log(req.body);
  req.body.isActive = req.body.isActive === "on" ? true : false;
  await Event.create(req.body);
  res.redirect("/event");
});

// Edit route - edit event
app.get("/event/edit/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  res.render("events/edit.ejs", { event, moment });
});

//Update route - put event
app.put("/event/:id", async (req, res) => {
  const id = req.params.id;
  req.body.isActive = req.body.isActive === "on" ? true : false;
  await Event.findByIdAndUpdate(id, req.body);
  res.redirect(`/event/${id}/runners`);
});

//Destroy route - delete event
app.delete("/event/:id", async (req, res) => {
  const id = req.params.id;
  await Event.findByIdAndDelete(id);
  res.redirect(`/event`);
});

//Show Route - display event by id
// app.get("/event/:id", async (req, res) => {
//   const id = req.params.id;
//   const event = await Event.findById(id);

//   res.render("events/show.ejs", { event });
// });
/////////////////
//Event-runners Routs
////////////////

// Show route - get event runners
app.get("/event/:eventId/runners", async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  const runners = await Runner.find({ eventId });
  res.render("events/show.ejs", { runners, event, eventId, moment });
});
/////////////////
//Runners Routs
////////////////

// Index route - get runners
app.get("/runner/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const runners = await Runner.find({ eventId });
  res.render("runners/index.ejs", { runners, eventId, moment });
});

// New route - get new runner
app.get("/runner/:eventId/new", (req, res) => {
  const eventId = req.params.eventId;
  res.render("runners/new.ejs", { eventId });
});

//Create route - post runner
app.post("/runner/:eventId", async (req, res) => {
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
});

// Edit route - get edit runner
app.get("/runner/:eventId/edit/:runnerId", async (req, res) => {
  const id = req.params.runnerId;
  const eventId = req.params.eventId;
  const runner = await Runner.findById(id);

  res.render("runners/edit.ejs", { runner, eventId, moment });
});

//Update route - put runner

app.put("/runner/:eventId/:id", async (req, res) => {
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
});

//Destroy route - delete event
app.delete("/runner/:eventId/:id", async (req, res) => {
  const id = req.params.id;
  const eventId = req.params.eventId;
  console.log(eventId);
  await Runner.findByIdAndDelete(id);
  debugger;
  res.redirect(`/runner/${eventId}`);
});

//Show route - get runner by id
app.get("/runner/:eventId/:id", async (req, res) => {
  const id = req.params.id;
  const eventId = req.params.eventId;
  const runner = await Runner.findById(id);

  res.render("runners/show.ejs", { runner, eventId });
});

// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
