const request = require('request')

const getWeatherInfo = (location, callback) => {
    const lat = location[0]
    const long = location[1]

    const url = `http://api.weatherstack.com/current?access_key=71a09078e22bb27ab7636c12a830a966&query=${long},${lat}`

    const reqOptions = {
        url,
        json: true
    }
    debugger
    request(reqOptions, (error, response, body) => {
        debugger
        if(error) {
            callback('Communication error')
        } else if(body.success === false){
            callback('Invalid input for weather app')
        } else {
            const {temperature : temp, feelslike: feelsLike} = body.current
            // const temp = body.current.temperature
            // const feelsLike = body.current.feelslike
            callback(undefined, {temp, feelsLike})
        }
    })
}

module.exports = {
    getWeatherInfo: getWeatherInfo
}



// const options = {
//     url: url,
//     json: true
// }
// request(options, (error, response) => {
//     const temperature = response.body.current.temperature
//     const feelsLike = response.body.current.feelslike
//     console.log(`Current temperature is ${temperature} and it feels like ${feelsLike}`)
// })