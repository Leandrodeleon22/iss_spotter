const request = require("request");

const fetchMyIp = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = function (str, callback) {
  request(str, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    const data = JSON.parse(body);

    if (!data.success) {
      const msg = `Status Code ${data.success} server message says ${data.message} when fetching for ip: ${data.ip}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
      }
      const data = JSON.parse(body);
      if (data.message !== "success") {
        const msg = `Status Code ${data.message}`;
        callback(Error(msg), null);
      }

      callback(null, data.response);
    }
  );
};

module.exports = { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes };

//As input it expects a latitude/longitude pair, an altitude, and how many results to return. done
//As output you get the same inputs back (for checking) and a time stamp when the API ran in addition to a success
//or failure message and a list of passes.
//Each pass has a duration in seconds and a rise time as a unix time stamp.

//Make a request using the following URL: https://iss-flyover.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE. done
//Note that the example URL has only the required inputs included. The output is in JSON format.

//Implement a function fetchISSFlyOverTimes in iss.js, given the following outline. with coords and callback params
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

/*
When calling this function from index.js, the coords should be passed in using the same object format that our previous fetchCoordsByIP function returned.

Example input:

{ latitude: '49.27670', longitude: '-123.13000' }
Output
This function should pass back the array of objects inside the response property.

Example data returned via callback:

[
  { risetime: 146820455, "duration": 545 },
  ...
]
Remember to test the function from index.js and to lint both files!

*/
