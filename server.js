//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");
const Event = require("./models/Event");
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

//Show Route - display event by id
app.get("/event/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);

  res.render("events/show.ejs", { event });
});
// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
