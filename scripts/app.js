//imports
import { apiKey } from "./environment.js"

//IDs to Target
let dateNav = document.getElementById('dateNav');
let centerDay = document.getElementById('centerDay');
let centerLocation = document.getElementById('centerLocation')
let searchBar = document.getElementById('search');
let centerTemp = document.getElementById('centerTemp');
let minMax = document.getElementById('minMax');
let day2Day = document.getElementById('day2Day')
let day2High = document.getElementById('day2High')
let day2Low = document.getElementById('day2Low')
let day3Day = document.getElementById('day3Day')
let day3High = document.getElementById('day3High')
let day3Low = document.getElementById('day3Low')
let day4Day = document.getElementById('day4Day')
let day4High = document.getElementById('day4High')
let day4Low = document.getElementById('day4Low')
let day5Day = document.getElementById('day5Day')
let day5High = document.getElementById('day5High')
let day5Low = document.getElementById('day5Low')
let day6Day = document.getElementById('day6Day')
let day6High = document.getElementById('day6High')
let day6Low = document.getElementById('day6Low')

//grab date
let date = new Date();
date.setDate(date.getDate() + 1)
date.setDate(date.getDate() + 1)
date.setDate(date.getDate() + 1)
date.setDate(date.getDate() + 1)
date.setDate(date.getDate() + 1)
let currentDate = new Date();

//format dates
let longDay = currentDate.toLocaleDateString('default', { weekday: 'long' });
let shortDay = currentDate.toLocaleDateString('default', { day: 'numeric' })
let month = currentDate.toLocaleDateString('default', { month: 'long' });

//Set Date in Navbar to Current Date
dateNav.textContent = `${longDay}, ${month} ${shortDay}`;

//Set Date in Center to Current Date
centerDay.textContent = `${longDay}`

//set dates in bottom
day2Day.textContent = `${new Date(currentDate.getTime() + 86400000).toLocaleDateString('default', { weekday: 'long' })}`
day3Day.textContent = `${new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('default', { weekday: 'long' })}`
day4Day.textContent = `${new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('default', { weekday: 'long' })}`
day5Day.textContent = `${new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('default', { weekday: 'long' })}`
day6Day.textContent = `${new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('default', { weekday: 'long' })}`

//gen lat and lon
let lat;
let lon;

//Set up location and what to do if it succeeds
navigator.geolocation.getCurrentPosition(success, errorFunc);

//Success of Grabbing Location
async function success(position) {

    if (searchBar.value) {
        const citySearch = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=5&appid=${apiKey}`);
        const cityName = await citySearch.json();
        lat = cityName[0].lat;
        lon = cityName[0].lon;
    }
    else {
        //set lat and lon to coords
        lat = position.coords.latitude
        lon = position.coords.longitude
    }

    //Current Weather API
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const weatherData = await weatherPromise.json()

    //Forecast Weather API
    const forecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const forecastData = await forecastPromise.json();

    //fetch the API for Reverse Geolocation
    const locationPromise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`)
    const locationData = await locationPromise.json();

    //Gen Max and Min Arrays
    let tempMaxs1 = [];
    let tempMins1 = [];
    let tempMaxs2 = [];
    let tempMins2 = [];
    let tempMaxs3 = [];
    let tempMins3 = [];
    let tempMaxs4 = [];
    let tempMins4 = [];
    let tempMaxs5 = [];
    let tempMins5 = [];
    let tempMaxs6 = [];
    let tempMins6 = [];
    let conditions1 = [];
    let conditions2 = [];
    let conditions3 = [];
    let conditions4 = [];
    let conditions5 = [];
    let conditions6 = [];

    tempMaxs1.push(weatherData.main.temp_max)
    tempMins1.push(weatherData.main.temp_min)
    conditions1.push(weatherData.weather[0].main)

    for (let i = 0; i < forecastData.list.length; i++) {

        let unixTime = new Date(forecastData.list[i].dt * 1000)
        let unixTime2 = new Date(forecastData.list[i].dt * 1000 + 86400000)
        let unixTime3 = new Date(forecastData.list[i].dt * 1000 + (86400000 * 2))
        let unixTime4 = new Date(forecastData.list[i].dt * 1000 + (86400000 * 3))
        let unixTime5 = new Date(forecastData.list[i].dt * 1000 + (86400000 * 4))
        let unixTime6 = new Date(forecastData.list[i].dt * 1000 + (86400000 * 5))

        if (unixTime.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs1.push(forecastData.list[i].main.temp_max)
            tempMins1.push(forecastData.list[i].main.temp_min)
            conditions1.push(forecastData.list[i].weather[0].main)

        }
        else if (unixTime2.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs2.push(forecastData.list[i].main.temp_max)
            tempMins2.push(forecastData.list[i].main.temp_min)
            conditions2.push(forecastData.list[i].weather[0].main)

        }
        else if (unixTime3.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs3.push(forecastData.list[i].main.temp_max)
            tempMins3.push(forecastData.list[i].main.temp_min)
            conditions3.push(forecastData.list[i].weather[0].main)

        }
        else if (unixTime4.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs4.push(forecastData.list[i].main.temp_max)
            tempMins4.push(forecastData.list[i].main.temp_min)
            conditions4.push(forecastData.list[i].weather[0].main)

        }
        else if (unixTime5.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs5.push(forecastData.list[i].main.temp_max)
            tempMins5.push(forecastData.list[i].main.temp_min)
            conditions5.push(forecastData.list[i].weather[0].main)

        }
        else if (unixTime6.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
            tempMaxs6.push(forecastData.list[i].main.temp_max)
            tempMins6.push(forecastData.list[i].main.temp_min)
            conditions6.push(forecastData.list[i].weather[0].main)

        }
    }

    //Use API Data to make and populate info
    let currentTemp = Math.round(weatherData.main.temp);
    centerTemp.textContent = `${currentTemp}°`

    let currentMin = Math.round(Math.min(...tempMins1));
    let currentMax = Math.round(Math.max(...tempMaxs1));
    minMax.textContent = `Min ${currentMin}°, Max ${currentMax}°`

    day2High.textContent = `${Math.round(Math.max(...tempMaxs2))}°`
    day2Low.textContent = `${Math.round(Math.min(...tempMins2))}°`

    day3High.textContent = `${Math.round(Math.max(...tempMaxs3))}°`
    day3Low.textContent = `${Math.round(Math.min(...tempMins3))}°`

    day4High.textContent = `${Math.round(Math.max(...tempMaxs4))}°`
    day4Low.textContent = `${Math.round(Math.min(...tempMins4))}°`

    day5High.textContent = `${Math.round(Math.max(...tempMaxs5))}°`
    day5Low.textContent = `${Math.round(Math.min(...tempMins5))}°`

    day6High.textContent = `${Math.round(Math.max(...tempMaxs6))}°`
    day6Low.textContent = `${Math.round(Math.min(...tempMins6))}°`

    //set location in center to location
    let placeName = locationData[0].name;
    let stateName = locationData[0].state;
    centerLocation.textContent = `${placeName}, ${stateName}`;
}
//failure of grabbing location
function errorFunc(error) {
    error.message
}

searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        success(searchBar.value)
        e.preventDefault();
        return false;
    }
});