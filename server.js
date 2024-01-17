//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");

const moment = require("moment");

const eventController = require("../controllers/event");
const runnerController = require("../controllers/runner");

//get .env variable
const { PORT } = process.env;

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
app.use("/event", eventController);
app.use("/runner", runnerController);

// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
