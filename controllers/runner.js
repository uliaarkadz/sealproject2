//////////////////////////////////////
//Import Dependencies
///////////////////////////////////////
const express = require("express");
const runnerActions = require("../actions/runners");

//////////////////////////////////////
// Create the Router
///////////////////////////////////////
const router = express.Router();

/////////////////
//Runners Routs
////////////////

// Index route - get runners
router.get("/:eventId", runnerActions.index);

// New route - get new runner
router.get("/:eventId/new", runnerActions.newRoute);

//Create route - post runner
router.post("/:eventId", runnerActions.create);

// Edit route - get edit runner
app.get("/runner/:eventId/edit/:runnerId", runnerActions.edit);

//Update route - put runner

router.put("/:eventId/:id", runnerActions.update);

//Destroy route - delete event
router.delete("/:eventId/:id", runnerActions.destroy);

//Show route - get runner by id
router.get("/:eventId/:id", runnerActions.show);
