const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()

//--- set up the port thet HEROKU provide (used for app.listen())
const port = process.env.PORT || 3000 //this is just ternary for if lese

//--- Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//--- St up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//--- Set up static directory to server
app.use(express.static(publicDir))

//--- Set up ROUTE HANDLER/ response for cliend request

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Huy',
        content: 'can anybody see my dick?',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Huy',
        content: 'Hi! My name is Huy',
        imgSrc: '/images/profile-picture.jpg',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Here is where you can get some help',
        name: 'Huy',
        content: 'How can i help you',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'You must enter a location.'
        })
    }

    const {location} = req.query
    geoCode(location, (error, {lat, long, location} = {}) => {
        if(error) {
           return res.send({
               error,
           })
        } 
        
        forecast(lat, long, (error, data) => {
            if(error) {
                return res.send({
                    error,
                })
            }                       
            res.send({
                input_address: req.query.location,
                location,
                forecast: data
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please enter your product',
        })
    }

    res.send({
        product: []
    })
    console.log(req.query)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Huy',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Huy',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})