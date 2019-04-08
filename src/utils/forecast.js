const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/337d8177b1f76ee7261b4f09bdae772e/${latitude},${longitude}?units=si`

    request({ url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. There is ${body.currently.precipProbability}% for rain.`)
        }
    })
};

module.exports = forecast

