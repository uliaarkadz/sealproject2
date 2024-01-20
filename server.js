//Dependancies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("./models/connection");

const moment = require("moment");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const eventController = require("./controllers/event");
const runnerController = require("./controllers/runner");
const userController = require("./controllers/user");

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
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);
app.use("/event", eventController);
app.use("/runner", runnerController);
app.use("/user", userController);
// turn on the server (the listener)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
