const request = require('request-promise-native');


const fetchMyIP = function() {
  return request(`https://api.ipify.org/?format=json`);

};

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${IP}`);
};

const fetchISSFlyOverTimes = function(body) {
  const Coordinates = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${Coordinates['lat']}&lon=${Coordinates['lon']}`);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };