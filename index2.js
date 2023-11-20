const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((body) => {
//     console.log(body);
//   });

const printPassTimes = function (passtimes) {
  for (const pass of passtimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime}for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passtimes) => {
    printPassTimes(passtimes);
  })
  .catch((error) => {
    console.log(error);
  });
