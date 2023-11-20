const {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

const printPassTimes = function (passtimes) {
  for (const pass of passtimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime}for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passtimes) => {
  if (error) {
    return console.log("It didnt work", error);
  }

  printPassTimes(passtimes);
});

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didnt work", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIp("http://ipwho.is/99.241.135.239", (err, data) => {
//   if (err) {
//     console.log("It didnt work", err);
//     return;
//   }
//   console.log(data);
//   fetchISSFlyOverTimes(data, (error, arrayOfObj) => {
//     if (error) {
//       console.log("It didnt work", error);
//     }
//     printPassTimes(arrayOfObj);
//     // console.log(arrayOfObj);
//   });
// });
