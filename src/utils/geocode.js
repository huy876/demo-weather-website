const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoiaHV5dnU4NzYiLCJhIjoiY2tmeGZ4MDdoMWNkdzMxcXFqZzNwbHVlcSJ9.uixlQpk_xnJOzjOaThMuWg'
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect Geo Location service', undefined)
        } else if(body.message === 'Not Found') {
            callback('Please enter location', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to detect location', undefined)
        } else {
            const{place_name, center} = body.features[0]
            const data = {
                location: place_name,
                lat: center[1],
                long: center[0]
            }
            callback(null, data)
        }
    })
}

module.exports = geoCode