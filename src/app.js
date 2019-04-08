const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'A weather for your destination!',
        name: 'Uros Brkic'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Uros Brkic'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, weatherData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Uros',
        errorMessage: 'Page not found'
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
