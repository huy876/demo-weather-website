const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5cba8d181feda25ce1d7eda06a67b3a&query=' + lat + ',' + long
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect forecast service', undefined)
        } else if(body.success === false) {
            callback('No coordinates detected. Try another please', undefined)
        } else {
            const data = body.current
//             const forecastMsg = `Weather description: ${data.weather_descriptions}
// Temperature: ${data.temperature}`

            callback(null, data)
        }
    })
}




module.exports = forecast