function getWeather() {
    const apiKey = 'YOUR_API_KEY';
    const city = document.getElementById('city-input').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById('city-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const moreTempDiv = document.getElementById('more-weather-info');
    const cityInfoDiv = document.getElementById('city-info');
    const weatherInfoDiv = document.getElementById('weather-info');

    // Clear previous content
    tempDiv.innerHTML = '';
    moreTempDiv.innerHTML = '';
    cityInfoDiv.innerHTML = '';
    weatherInfoDiv.innerHTML = '';


    if (data.cod === '404') {
        weatherInfoDiv.textContent = data.message;
    } else {
        const cityName = data.name;
        const countryName = data.sys.country;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const temperatureFeelsLike = Math.round(data.main.feels_like - 273.15);
        const minTemp = Math.round(data.main.temp_min - 273.15);
        const maxTemp = Math.round(data.main.temp_max - 273.15);
        const iconCode = data.weather[0].icon;   
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        // const weather = data.weather.main;
        const humidity = data.main.humidity;
        // const precipitation = data.main.rain;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

        const temperatureHTML = `${temperature}°C`;
        const moreTeamperatureHTML = `Min/Max: ${minTemp}°/${maxTemp}°<br>Feels Like: ${temperatureFeelsLike}°C`;
        const cityInformationHtml = `${cityName},${countryName}`;
        const weatherInfoHTML = `
                                   <div id="weather-details">
                                        <h2>${capitalizedDescription}</h2>
                                        Humidity: ${humidity}% <br>
                                        Wind Speed: ${windSpeed} km/h <br>
                                   <div>

        `;

        tempDiv.innerHTML = temperatureHTML;
        weatherIcon.src = iconUrl;
        moreTempDiv.innerHTML = moreTeamperatureHTML;
        cityInfoDiv.innerHTML = cityInformationHtml;
        weatherInfoDiv.innerHTML = weatherInfoHTML;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous content

    const next24Hours = hourlyData.slice(0, 8); // Display the next 8 items (assuming 3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius

        const hourlyItemHtml = `
            <div id="hourly-item">
                <span>${hour}:00</span>
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
