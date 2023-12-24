const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const API_KEY = '3bcecb328f872607c305d2f6d81e66cc'; 

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am';
    timeEl.innerHTML = `${hoursIn12HrFormat}:${minutes} <span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
}, 1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        const { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
                console.log(data);
                showWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}

function showWeatherData(data) {
    if (data && data.current) {
        const { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

        currentWeatherItemsEl.innerHTML = `
            <div class="weather-item">
                <div>Humidity</div>
                <div>${humidity}%</div>
            </div>
            <div class="weather-item">
                <div>Pressure</div>
                <div>${pressure} hPa</div>
            </div>
            <div class="weather-item">
                <div>Wind Speed</div>
                <div>${wind_speed} m/s</div>
            </div>
            <div class="weather-item">
                <div>Sunrise</div>
                <div>${new Date(sunrise * 1000).toLocaleTimeString()}</div>
            </div>
            <div class="weather-item">
                <div>Sunset</div>
                <div>${new Date(sunset * 1000).toLocaleTimeString()}</div>
            </div>
        `;
    } else {
        console.error('Invalid data structure or data is undefined.');
    }
}

// Initial load of weather data
getWeatherData();

// Refresh weather data every 10 minutes
setInterval(getWeatherData, 600000);
