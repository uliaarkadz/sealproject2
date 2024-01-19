const moment = require("moment");
//function calculate pace
const calculatePace = (finishTime, startTime, length, unit) => {
  //convert distance to miles
  let distance;

  switch (unit) {
    case "km":
      distance = length / 1.609;
      break;
    case "m":
      distance = length;
      break;
    default:
      console.log("Not valid inpit");
  }
  //calculate pace in minutes per mile
  const pace = calculateNetTime(finishTime, startTime) / 60 / distance;
  var duration = moment.duration(pace, "minutes");
  var paceTime = moment.utc(duration.asMilliseconds()).format("mm:ss.ss");

  return `${paceTime} min/mile`;
};

function calculateNetTime(finishTime, startTime) {
  const netTime = moment(finishTime, "hh:mm:ss").diff(
    moment(startTime, "hh:mm:ss"),
    "seconds"
  );
  return netTime;
}

function convertNetTime(finishTime, startTime) {
  const netTimeInSeconds = calculateNetTime(finishTime, startTime);
  var duration = moment.duration(netTimeInSeconds, "seconds");
  var netTime = moment.utc(duration.asMilliseconds()).format("HH:mm:ss.ss");
  return netTime;
}
module.exports = { calculatePace, calculateNetTime, convertNetTime };
