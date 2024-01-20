/////////////////////
//Import dependancies
////////////////////
const mongoose = require("./connection");
const Runner = require("./Runner");
const Event = require("./Event");

mongoose.connection.on("open", async () => {
  // seed code goes in this function
  try {
    // Run any database queries in this function
    const startEvent = [
      {
        eventName: "Run/Walk",
        description: "Nice Running/Walking Event",
        distance: 5,
        unit: "km",
        date: "2024-01-21",
        isActive: true,
      },
      {
        eventName: "Run",
        description: "Fun Running Event",
        distance: 10,
        unit: "km",
        date: "2024-01-27",
        isActive: true,
      },
      {
        eventName: "Half Marathon",
        description: "Famous Florida Half Marathon",
        distance: 13.1,
        unit: "m",
        date: "2024-01-28",
        isActive: true,
      },
    ];

    const startRunner = [];
    // Delete all
    await Event.deleteMany({});
    await Runner.deleteMany({});

    // Seed Starter
    const data = await Event.create(startEvent);

    // log the create fruits to confirm
    console.log("--------Event CREATED----------");
    console.log(data);
    console.log("--------Event CREATED----------");

    // close the DB connection
    mongoose.connection.close();
  } catch (error) {
    console.log("-------", error.message, "-------");
  }
});
