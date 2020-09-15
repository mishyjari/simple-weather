## Simple Weather

This is a simple weather forecasting application built to refine skills using Express.js and APIs.

It utilizes the free-tier weather api from [Weatherstack](https://weatherstack.com/) and the geocoding api from [Mapbox](https://www.mapbox.com/). If the user has location services enabled, Simple Weather will use the geolocation feature in HTML5 to request the current weather based on the user's location.

To run locally, you will need to provide your api keys for Mapbox and Weatherstack. The application is currently configured to expect both of these keys to be exported from `src/utils/apiKeys.js` as strings named `mapbox` and `weatherstack`, respectively.