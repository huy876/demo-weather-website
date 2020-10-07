window.onload = () => {
    console.log('hello world')

    // fetch('/weather?location=hanoi')
    //     .then((response) => response.json())
    //     .then(({error, location, forecast}) => {
    //         if(error) {
    //             console.log(error)
    //         } else {
    //             console.log('Location: ' + location)
    //             console.log('Desription: ' + forecast.weather_descriptions[0])
    //             console.log('Temperature: ' + forecast.temperature)
    //         }
    //     })

    const weatherForm = document.querySelector('form')
    const locationInput = document.getElementById('location')
    
    weatherForm.onsubmit = (event) => {
        event.preventDefault()

        document.getElementById('forecast_info').innerHTML = '<p>Loading forecast...</p>'

        const location = locationInput.value
        const url = '/weather?location=' + location

        fetch(url)
        .then((response) => response.json())
        .then(({error, location, forecast}) => {
            if(error) {
                document.getElementById('forecast_info').innerHTML = `<p> ${error} </p>`
            } else {
                const forecastMsg = '<p> Weather in ' + location + '</p>'
                                    + '<p> Description: ' + forecast.weather_descriptions + '</p>'
                                    + '<p> Temperature: ' + forecast.temperature + '</p>'
                document.getElementById('forecast_info').innerHTML = forecastMsg
            }
        })

    }


}