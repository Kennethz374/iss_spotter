const request = require('request');
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {//exmaple web API crashed,used another APi
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const coor = JSON.parse(body);
    let geo = {};
    geo['latitude'] = coor['lat'];
    geo['longitude'] = coor['lon'];
    callback(null, geo);
        // const { latitude, longitude } = JSON.parse(body).data;
    // callback(null, { latitude, longitude });
  });
};

// Don't need to export the other function since we are not testing it right now.
module.exports = { fetchCoordsByIP };