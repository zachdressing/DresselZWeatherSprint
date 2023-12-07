//imports
import { apiKey } from "./environment.js"

//IDs to Target
let dateNav = document.getElementById('dateNav');
let centerDay = document.getElementById('centerDay');
let centerLocation = document.getElementById('centerLocation')
let searchBar = document.getElementById('search');
let centerTemp = document.getElementById('centerTemp');
let minMax = document.getElementById('minMax');
let dropdownBtn = document.getElementById('dropdownBtn')
let dropdownList = document.getElementById('dropdownList')
let favoritesBtn = document.getElementById('favoritesBtn')
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
let forecast1 = document.getElementById('forecast1')
let forecast2 = document.getElementById('forecast2')
let forecast3 = document.getElementById('forecast3')
let forecast4 = document.getElementById('forecast4')
let forecast5 = document.getElementById('forecast5')
let forecastCenter = document.getElementById('forecastCenter')


//grab date
let currentDate = new Date(); //to no manip

//Add 1 day to the date 5 times
let date2 = new Date(currentDate.getTime() + 86400000)
let date3 = new Date(currentDate.getTime() + 86400000 * 2)
let date4 = new Date(currentDate.getTime() + 86400000 * 3)
let date5 = new Date(currentDate.getTime() + 86400000 * 4)
let date6 = new Date(currentDate.getTime() + 86400000 * 5)


//Set Date in Navbar to Current Date
dateNav.textContent = `${currentDate.toLocaleDateString('default', { weekday: 'long' })}, ${currentDate.toLocaleDateString('default', { month: 'long' })} ${currentDate.toLocaleDateString('default', { day: 'numeric' })}`;

//Set Date in Center to Current Date
centerDay.textContent = `${currentDate.toLocaleDateString('default', { weekday: 'long' })}`

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
        if (unixTime.toLocaleDateString('default') === currentDate.toLocaleDateString('default')) {
            tempMaxs1.push(forecastData.list[i].main.temp_max)
            tempMins1.push(forecastData.list[i].main.temp_min)
            conditions1.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date2.toLocaleDateString('default')) {
            tempMaxs2.push(forecastData.list[i].main.temp_max)
            tempMins2.push(forecastData.list[i].main.temp_min)
            conditions2.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date3.toLocaleDateString('default')) {
            tempMaxs3.push(forecastData.list[i].main.temp_max)
            tempMins3.push(forecastData.list[i].main.temp_min)
            conditions3.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date4.toLocaleDateString('default')) {

            tempMaxs4.push(forecastData.list[i].main.temp_max)
            tempMins4.push(forecastData.list[i].main.temp_min)
            conditions4.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date5.toLocaleDateString('default')) {
            tempMaxs5.push(forecastData.list[i].main.temp_max)
            tempMins5.push(forecastData.list[i].main.temp_min)
            conditions5.push(forecastData.list[i].weather[0].main)
        }
        else if (unixTime.toLocaleDateString('default') === date6.toLocaleDateString('default')) {
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


//Search Bar on press functionality
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        success(searchBar.value)
        e.preventDefault();
        return false;
    }
});

//Favorites Button

let listAdd = document.createElement('li');
listAdd.innerHTML = `${centerLocation.textContent}`;

let removeBtn = document.createElement('button')
//removeBtn.innerHTML = x;

function genFavs() {
    for (let i = 0; i < localStorage.length; i++) {
        dropdownList.appendChild(listAdd)
    }
}

centerFavorite.addEventListener('click', function (e) {
    if (localStorage.getItem(`${centerLocation.textContent}`)) {
        localStorage.removeItem(`${centerLocation.textContent}`)
    }
    else {
        localStorage.setItem(`${centerLocation.textContent}`, `${centerLocation.textContent}`)
    }
    genFavs();
})


//Needs to add the content from the Local Storage to the Dropdown
//
