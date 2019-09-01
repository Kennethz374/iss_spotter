const request = require('request');
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss2');
const { fetchISSFlyOverTimes } = require('./iss3');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, {latitude,longitude}) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes({latitude, longitude}, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };