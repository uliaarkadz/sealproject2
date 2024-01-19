const Event = require("../models/Event");
const Runner = require("../models/Runner");
const moment = require("moment");

/////////////////
//Event Routs
////////////////

// Index route - get events
const index = async (req, res) => {
  try {
    const event = await Event.find({});
    res.render("events/index.ejs", { event, moment });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

// New route - post event
const newRoute = (req, res) => {
  res.render("events/new.ejs");
};

//Create route - post event
const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.isActive = req.body.isActive === "on" ? true : false;
    await Event.create(req.body);
    res.redirect("/event");
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

// Edit route - edit event
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    res.render("events/edit.ejs", { event, moment });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

//Update route - put event
const update = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.isActive = req.body.isActive === "on" ? true : false;
    await Event.findByIdAndUpdate(id, req.body);
    res.redirect(`/event/${id}/runners`);
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

//Destroy route - delete event
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id);
    res.redirect(`/event`);
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

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
const show = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    const runners = await Runner.find({ eventId });
    res.render("events/show.ejs", { runners, event, eventId, moment });
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
};

module.exports = { index, destroy, newRoute, edit, update, show, create };
