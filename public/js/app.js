console.log('Client side JS loaded')

const weatherForm = document.querySelector('form')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = document.querySelector('input').value
    console.log(location)

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                console.log(data.error);
            } else {
                messageOne.textContent = 'Temperature: ' + data.temperature
                messageTwo.textContent = 'Feels like: ' + data.feelsLike
                console.log(data.temperature);
                console.log(data.feelsLike);
                console.log(data.address);
            }
        })
    })
})