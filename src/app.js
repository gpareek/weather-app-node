const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// App directories
const publicDirPath = path.join(__dirname, '../public')
const hbsTemplatesPath = path.join(__dirname, '../templates/views')
const partialsTemplatePath = path.join(__dirname, '../templates/partials')

// Handlebar settings
app.set('view engine', 'hbs')
app.set('views', hbsTemplatesPath)
hbs.registerPartials(partialsTemplatePath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Gaurav Pareek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gaurav Pareek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: `This is a help page.\n
        It is meant to provide useful information for the users.
        
        Hope you like it.`,
        name: 'Gaurav Pareek'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address was not provided'
        })
    }
    const {address} = req.query
    geocode.getGeocode(address, (error, {latitude, longitude} = {}) => {
        console.log(`lat ${latitude} and long ${longitude}`)
        if(error) {
            return res.send({
                error: `Unable to find location info for the given address ${address}.`
            })
        }
        weather.getWeatherInfo([latitude, longitude], (error, {temp, feelsLike}) => {
            return res.send({
                temperature: temp,
                feelsLike,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'help page not found',
        title: 'Help 404 page',
        name: 'Gaurav Pareek'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'page not found',
        title: '404 page',
        name: 'Gaurav Pareek'
    })
})

app.listen(3000)
console.log('Express server listening on port 3000')