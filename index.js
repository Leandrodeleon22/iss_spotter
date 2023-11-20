const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes } = require("./iss");

fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didnt work", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIp("http://ipwho.is/99.241.135.239", (err, data) => {
  if (err) {
    console.log("It didnt work", err);
    return;
  }
  console.log(data);
  fetchISSFlyOverTimes(data, (error, arrayOfObj) => {
    if (error) {
      console.log("It didnt work", error);
    }
    console.log(arrayOfObj);
  });
});
