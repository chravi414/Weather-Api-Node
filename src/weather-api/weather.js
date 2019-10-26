const request = require('request');

const key = '50179e882066ceb859ec84231947394d';

const weather = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${long},${lat}`;
    request.get({url : url, json:true}, (err, res) => {
        if(err) {
            callback('Please try after sometime', undefined);
        } else {
            if(res.body.error) {
                callback(res.body.error, undefined);
            } else {
                const result = res.body.daily.summary
                callback(undefined, result);
            }
        }
    })
}

// weather(37.8267,-122.4233, (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

module.exports = {
    weather : weather
}