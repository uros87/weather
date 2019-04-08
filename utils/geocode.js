const request = require('request');

const geocode = (address, callback) => {
    const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoidXJvc2Jya2ljIiwiYSI6ImNqdHNnOGdpMzBrZngzeW1taHFzMXRxaWQifQ.Yabe58xR6yq7dhg643tHKg`;

    request({ url: urlGeo, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geolocation service!!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find that location. Try with another term!!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;