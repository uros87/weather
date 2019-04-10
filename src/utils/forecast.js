const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/337d8177b1f76ee7261b4f09bdae772e/${latitude},${longitude}?units=si`

    request({ url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, { 
                timeData: body.currently.time,
                currentSummary: body.currently.summary,
                todaySummary: body.hourly.summary,
                todayMaxTemp: body.currently.temperature,
                nextDay: body.daily.data[1].time,
                nextDaySummary: body.daily.data[1].summary,
                nextDayMaxTemp: body.daily.data[1].temperatureHigh,
                secondDay: body.daily.data[2].time,
                secondDaySummary: body.daily.data[2].summary,
                secondDayMaxTemp: body.daily.data[2].temperatureHigh,
                thirdDay: body.daily.data[3].time,
                thirdDaySummary: body.daily.data[3].summary,
                thirdDayMaxTemp: body.daily.data[3].temperatureHigh,
                fourthDay: body.daily.data[4].time,
                fourthDaySummary: body.daily.data[4].summary,
                fourthDayMaxTemp: body.daily.data[4].temperatureHigh,
                fifthDay: body.daily.data[5].time,
                fifthDaySummary: body.daily.data[5].summary,
                fifthDayMaxTemp: body.daily.data[5].temperatureHigh,
                sixthDay: body.daily.data[6].time,
                sixthDaySummary: body.daily.data[6].summary,
                sixthDayMaxTemp: body.daily.data[6].temperatureHigh,                    
             })
        }
    })
};

module.exports = forecast

