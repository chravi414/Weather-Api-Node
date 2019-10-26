const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./weather-api/geocode');
const weather = require('./weather-api/weather');


const app = express();
const staticDirectory = path.join(__dirname, '../public');
app.use(express.static(staticDirectory));

// https://medium.com/programming-sage/handlebars-in-node-js-tutorial-a30a41fc6206

app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, '../views'));

app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// CUstomize views
// app.set('views', path.join(__dirname, '../templates')); 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        content: 'This is Dynamic Index content'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'This is Dynamic help page content'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        content : 'This is about page dynamic content'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.location;
    if(!location) {
        return res.send({
            error : 'Please provide location to get weather information.'
        })
    }
    geocode.geocode(location, (err, {longitude, latitude, place} = '') => {
        if(err) {
            return res.send({ error : err});
        }  
        weather.weather(longitude, latitude, (err, output) => {
            if(err) {
                return res.send({ error : err});
            }
            res.send({
                summary : output,
                location: place
            });
        });
    });
})

app.get('*', (req, res) => {
    res.render('page-not-found')
})

app.listen(5000, () => {
    console.log('Server is running');
})