const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars Engine and Views Locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static public directory
app.use(express.static(publicDirectory));

// Static variables for templates
const githubUrl = 'https://www.github.com/mishyjari';
const name = 'Mishy Jari';

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name,
        githubUrl
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        image: '/images/kitten.jpg',
        name,
        githubUrl
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpBody: 'I am some helpful information',
        name,
        githubUrl
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if ( !address ) {
        return res.send({ error: 'No Address Provided.'})
    }

    // Address query param exists, pass into into geocode()
    geocode(address, (geocodeErr, geocodeResponse) => {
        if ( geocodeErr ) { 
            return res.send({ error: geocodeErr }) 
        };

        // geocode() did not return an error, pass the response object into forecast()
        forecast(geocodeResponse, (forecastErr, forecastResponse) => {
            if ( forecastErr ) { return res.send({ error: forecastErr }) };
            res.send(forecastResponse)
        })
    })
});

app.get('/help/*', (req,res) => {
    res.render('notfound', {
        title: 'Help',
        message: 'Help Article Not Found',
        name,
        githubUrl
    });
});

app.get('*', (req,res) => {
    res.render('notfound', {
        title: 'Weather',
        message: '404 Page Not Found.',
        name,
        githubUrl
    })
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});