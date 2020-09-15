const request = require('postman-request');
// Store your api keys in apiKeys.js. Will expect a variable named 'weatherstack' containing api key to be exported.
const api = require('./apiKeys.js');

// Return a url string to weatherstack's api. Using current and farenheit as defaults for now
const getWeatherQuery = (lat,lon,type='current',units='f') => `http://api.weatherstack.com/${type}?access_key=${api.weatherstack}&query=${lat},${lon}&units=${units}`;

// Take an object containing coordinates and string describing location, send request to api
const forecast = ({latitude, longitude, name}={}, callback) => {
    const url = getWeatherQuery(latitude,longitude);
    request({
        url: url,
        json: true
    }, ( err, { body }={} ) => {
        // Low level error. Possibly lack of internet connection
        if ( err ) { 
            callback('Unable to connect to remote server. Are you connected to the internet?', undefined)
        }
        // Error from server.
        else if ( body.error ) {
            const {code,type,info} = body.error;
            callback(`Error code ${code}: ${type} - ${info}`, undefined)
        }
        // Response success.
        else {
            const { temperature, weather_descriptions } = body.current;

            callback(undefined,  {
                name,
                forecast: `It is currently ${temperature}° with ${weather_descriptions.join(' and ')} in ${name}`,
                // Dump the full forecast object for future parsing
                data: body.current
            })
        }
    });
}

module.exports = forecast;