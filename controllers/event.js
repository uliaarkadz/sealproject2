//////////////////////////////////////
//Import Dependencies
///////////////////////////////////////
const express = require("express");
const eventActions = require("../actions/events");

//////////////////////////////////////
// Create the Router
///////////////////////////////////////
const router = express.Router();

/////////////////
//Event Routs
////////////////

// Index route - get events
router.get("/", eventActions.index);

// New route - post event
router.get("/new", eventActions.newRoute);

//Create route - post event
router.post("/", eventActions.create);

// Edit route - edit event
router.get("/edit/:id", eventActions.edit);

//Update route - put event
router.put("/:id", eventActions.update);

//Destroy route - delete event
router.delete("/event/:id", eventActions.destroy);

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
router.get("/:eventId/runners", eventActions.show);

module.exports = router;
