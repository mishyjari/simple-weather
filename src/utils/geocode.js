const request = require('postman-request');
// Store your api keys in apiKeys.js. Will expect a variable named 'mapbox' containing api key to be exported.
const api = require('./apiKeys.js');

const geocode = (query, callback) => {
    // Generate url string based on imported api key and query argument
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${api.mapbox}&autocomplete=false&country=US`;

    request({
        url,
        json: true
    }, ( err, { body,message }={} ) => {
        // Low level error
        if ( err ) { 
            callback('Unable to connect to remote server.', undefined)
        }
        // No results returned
        else if ( body.features.length === 0 || message ) {
            callback('Location not found', undefined)
        }
        // Response success
        else {
            const name = body.features[0].place_name;
            const [lon,lat] = body.features[0].center;
            // Callback with second arg indicating no errors. This can be passed into the forecast() function
            callback(undefined, {
                name: name,
                latitude: lat,
                longitude: lon 
            })
        }
    })
}

module.exports = geocode;
