const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const API_KEY = `&APPID=553668e995f051c41337492028b87231`;

const city = document.getElementById('city');
const cityBtn = document.getElementById('city-btn');
const displayCurrentWeather = document.getElementById('current-weather');
const displayCityName = document.getElementById('city-name');
const displayCurrentDate = document.getElementById('current-date');
const displayTemperature = document.getElementById('temperature');
const displayTemperatureSwitch = document.getElementById('temperature-switch');
const displayWeatherIcon = document.getElementById('weather-icon');
const infoFeels = document.getElementById('feels');
const infoHumidity = document.getElementById('humidity');
const infoWindSpeed = document.getElementById('wind-speed');

// get weather data from the server
async function getWeatherData (aCity) {
    const response = await fetch(BASE_URL + aCity + API_KEY + "&units=metric");
    const weatherData = await response.json();
    displayCurrentWeather.textContent = weatherData.weather[0].main;
    changeBg();
    displayCityName.textContent = weatherData.name;
    displayCurrentDate.textContent = new Date();
    displayTemperature.textContent = weatherData.main.temp + "ºC";
    infoFeels.textContent = weatherData.main.feels_like + 'ºC';
    infoHumidity.textContent = weatherData.main.humidity + '%';
    displayWeatherIcon.src = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"
    infoWindSpeed.textContent = weatherData.wind.speed + 'm/s';
}

// get city data based on the input 
const getCity = () => {
    const cityName = city.value;
    const convertedCityName = convertCityName(cityName);
    getWeatherData(convertedCityName);
}

// start getCity on button press 
cityBtn.addEventListener('click', getCity);

// convert city name
function convertCityName (someCity) {
    const convertCityName = someCity.replace(/ /g, '+');
    return convertCityName;
}

// switch temperature display
function convertTemperature () {
    const temperatureConvert = parseFloat(displayTemperature.textContent);
    if (displayTemperature.textContent.includes('ºC')) {
        const convertedToF = (temperatureConvert * 1.8) + 32;
        displayTemperatureSwitch.textContent = 'Convert to ºC';
        return displayTemperature.textContent = convertedToF.toFixed(2) + 'ºF';
    } else if (displayTemperature.textContent.includes('ºF')) {
        const convertedToCelsius = (temperatureConvert - 32) / 1.8;
        displayTemperatureSwitch.textContent = 'Convert to ºF';
        return displayTemperature.textContent = convertedToCelsius.toFixed(2) + 'ºC';
    }
}

displayTemperatureSwitch.addEventListener('click', convertTemperature);

const changeBg = () => {
    if (displayCurrentWeather.textContent === 'Clouds'){
        document.body.style.color = 'black';
        return document.body.style.backgroundImage = `url('imgs/clouded.jpg')`;
    } else if (displayCurrentWeather.textContent === 'Rain') {
        document.body.style.color = 'white';
        return document.body.style.backgroundImage = `url('imgs/rain.jpg')`
    } else if (displayCurrentWeather.textContent === 'Snow') {
        document.body.style.color = 'black';
        return document.body.style.backgroundImage = `url('imgs/snow.jpg')`
    }  else if (displayCurrentWeather.textContent === 'Thunderstorm') {
        document.body.style.color = 'white';
        return document.body.style.backgroundImage = `url('imgs/thunderstorm.jpg')`
    }  else if (displayCurrentWeather.textContent === 'Drizzle') {
        document.body.style.color = 'white';
        return document.body.style.backgroundImage = `url('imgs/drizzle.jpg')`
    }  else if (displayCurrentWeather.textContent === 'Clear') {
        document.body.style.color = 'black';
        return document.body.style.backgroundImage = `url('imgs/clearsky.jpg')`
    }  else  {
        document.body.style.color = 'black';
        document.body.style.backgroundImage = `url('imgs/other.jpg')`
    } 
}

// default city loader 
getWeatherData('London');