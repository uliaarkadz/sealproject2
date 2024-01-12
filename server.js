//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const Event = require("./models/Event");
const Runner = require("./models/Runner");
const moment = require("moment");

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
  res.redirect(`/event/${id}`);
});

//Destroy route - delete event
app.delete("/event/:id", async (req, res) => {
  const id = req.params.id;
  await Event.findByIdAndDelete(id);
  res.redirect(`/event`);
});

//Show Route - display event by id
app.get("/event/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);

  res.render("events/show.ejs", { event });
});

/////////////////
//Runners Routs
////////////////
// Index route - get events
app.get("/runner/:eventId", async (req, res) => {
  const runners = await Runner.find({});
  res.render("runners/index.ejs", { runners, moment });
});

// New route - post event
app.get("/runner/:eventId/new", (req, res) => {
  const eventId = req.params.eventId;
  res.render("runners/new.ejs", { eventId });
});

//Create route - post event
app.post("/runner/:eventId", async (req, res) => {
  req.body.eventId = req.params.eventId;

  await Runner.create(req.body);
  res.redirect(`/event/${req.params.eventId}`);
});
// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//"<%=moment(event.date).format('yyyy/MM/DD')%>
