const request = require('request');
const access_token = 'pk.eyJ1IjoiY2hyYXZpNDE0IiwiYSI6ImNrMXVoaW1jaTBwN3kzaHF5dmp3dHFwYTcifQ.chUU1f2nmdvLNT2Xp6efYg';

const geocode = (address, getWeather) => {
    if (address) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}`;
        request.get({ url: url, json: true }, (err, res) => {
            if (err) {
                return getWeather('Please try after sometime', undefined);
            } else {
                if (res.body.message) {
                    console.log(res.body.message);
                    return getWeather(res.body.message, undefined);
                } else {
                    if (res.body.features[0]) {
                        const result = {
                            longitude: res.body.features[0].center[0],
                            latitude: res.body.features[0].center[1],
                            place: res.body.features[0].place_name
                        };
                        return getWeather(undefined, result);
                    }
                    return getWeather('Please enter proper location', undefined);
                }
            }
        })
    }
}

// geocode('Sattenapalle', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data);
//     }
// })

module.exports = {
    geocode : geocode
}