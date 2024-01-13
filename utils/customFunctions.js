const moment = require("moment");
//function calculate pace
const calculatePace = (finishTime, startTime, distance) => {
  //calculate pace in minutes per mile
  const pace = calculateNetTime(finishTime, startTime) / 60 / distance;
  var duration = moment.duration(pace, "minutes");
  return `${duration.minutes()}:${duration.seconds()} minutes/mile`;
};

function calculateNetTime(finishTime, startTime) {
  const netTime = moment(finishTime, "h:mm:ss").diff(
    moment(startTime, "H:mm:ss"),
    "seconds"
  );
  return netTime;
}
module.exports = { calculatePace };
