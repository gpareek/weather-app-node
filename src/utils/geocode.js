const request = require('request')

const getGeocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoicndzdHR5cnIiLCJhIjoiY2tjc3hlbGpqMXRjMTJ6bGgycGR2Z3F2MCJ9.Y2fAkefAx_CyxSxjiX4-SA&limit=1`
    debugger
    const requestOptions = {
        url,
        json : true
    }
    request(requestOptions, (error, response, body) => {
        debugger
        if(error) {
            callback('There was an error in communicating with the weather service')
        } else if(body.features.length === 0) {
            callback('Input is incorrect')
        } else {
            //const {center[0] : latitude, center[1] : longitude} = body.features[0]
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            callback(undefined, {latitude, longitude})
        }
    })

}

module.exports = {
    getGeocode : getGeocode
}