const request = require('request');
const fetchISSFlyOverTimes = function({latitude, longitude}, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Rise Time and Duration Time. Response: ${data}`;
      callback(Error(msg), null);
      return;
    } else if (data) {
      let Obj = JSON.parse(data).response;
      callback(null,Obj);
    }
  });
};

module.exports = { fetchISSFlyOverTimes };