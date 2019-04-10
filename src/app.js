const path = require('path');
const express = require('express');
const hbs = require('hbs');

const moment = require('moment')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
// 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Uros Brkic'
    })
})

app.get('/weekly', (req, res) => {
    res.render('weekly', {
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
                timeData: moment.unix(weatherData.timeData).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                currentSummary: weatherData.currentSummary,
                todaySummary: weatherData.todaySummary,
                todayMaxTemp: weatherData.todayMaxTemp,
                location: location
            })
        })
    })
});

app.get('/weather2', (req, res) => {
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
                timeData: moment.unix(weatherData.timeData).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                nextDay: moment.unix(weatherData.nextDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                secondDay: moment.unix(weatherData.secondDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                thirdDay: moment.unix(weatherData.thirdDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                fourthDay: moment.unix(weatherData.fourthDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                fifthDay: moment.unix(weatherData.fifthDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                sixthDay: moment.unix(weatherData.sixthDay).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                nextDaySummary: weatherData.nextDaySummary,
                nextDayMaxTemp: weatherData.nextDayMaxTemp,
                secondDaySummary: weatherData.secondDaySummary,
                secondDayMaxTemp: weatherData.secondDayMaxTemp,
                thirdDaySummary: weatherData.thirdDaySummary,
                thirdDayMaxTemp: weatherData.thirdDayMaxTemp,
                fourthDaySummary: weatherData.fourthDaySummary,
                fourthDayMaxTemp: weatherData.fourthDayMaxTemp,
                fifthDaySummary: weatherData.fifthDaySummary,
                fifthDayMaxTemp: weatherData.fifthDayMaxTemp,
                sixthDaySummary: weatherData.sixthDaySummary,
                sixthDayMaxTemp: weatherData.sixthDayMaxTemp,
                location: location
            })
        })
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
