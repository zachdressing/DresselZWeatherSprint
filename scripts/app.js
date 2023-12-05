//import Key
import {apiKey} from "./environment.js"

//ID Grabs to Target
let dateNav = document.getElementById('dateNav');
let centerDay = document.getElementById('centerDay');
let centerLocation = document.getElementById('centerLocation')
let searchVal = document.getElementById('search').value;

//grab date
const date = new Date();

//format dates
let longDay = date.toLocaleDateString('default', { weekday: 'long' });
let shortDay = date.toLocaleDateString('default', { day: 'numeric' })
let month = date.toLocaleDateString('default', { month: 'long' });

//Log to confirm working
console.log(month);
console.log(longDay);
console.log(shortDay);

//Set Date in Navbar to Current Date
dateNav.textContent = `${longDay}, ${month} ${shortDay}`;

//Set Date in Center to Current Date
centerDay.textContent = `${longDay}`

//get lat and lon
let lat;
let lon;

//Set up grabbing location and what to do when it does
navigator.geolocation.getCurrentPosition(success, errorFunc);
{
    coords: {
        latitude: 10;
        longitude: 20;
    }
}

//Success of Grabbing Location
function success(position) {

    //set lat and lon to coords
    lat = position.coords.latitude
    lon = position.coords.longitude

    //fetch the API for weather
    async function apiCall() {
        const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        const weatherData = await weatherPromise.json();

        //Use API Data to make and populate info
        let currentTemp = Math.round(weatherData.list[0].main.temp);
        centerTemp.textContent = `${currentTemp}°`

        let currentMin = Math.round(weatherData.list[0].main.temp_min);
        let currentMax = Math.round(weatherData.list[0].main.temp_max);
        minMax.textContent = `Min ${currentMin}°, Max ${currentMax}°`

        //fetch the API for Reverse Geolocation
        const locationPromise = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        const locationData = await locationPromise.json();

        //Add an if statement to check for if in US

        //set location in center to location
        let locality = locationData.locality;
        let state = locationData.principalSubdivision;
        centerLocation.textContent = `${locality}, ${state}`;

        //seperate the API call by day using the list (check date to find amount remaining)
        //Grab the lowest min and highest max of each day
    }
    apiCall();

}

function errorFunc() { };


//grab variables from API (thanks Leo for the help!)
let centerTemp = document.getElementById('centerTemp');
let minMax = document.getElementById('minMax');



