const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/148c106ad9a1fee48ffe7e57ad63847e/${latitude},${longitude}?units=si&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unabled to connect to weather service.');
    } else if (body.error) {
      callback('Unabled to find location');
    } else {
      const { temperature, precipProbability } = body.currently;
      const { daily } = body;

      callback(
        undefined,
        `${daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
