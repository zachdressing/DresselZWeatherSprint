//imports
import { apiKey } from "./environment.js"

//IDs to Target
let dateNav = document.getElementById('dateNav');
let centerDay = document.getElementById('centerDay');
let centerLocation = document.getElementById('centerLocation')
let searchVal = document.getElementById('search').value;
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
const date = new Date();

//format dates
let longDay = date.toLocaleDateString('default', { weekday: 'long' });
let shortDay = date.toLocaleDateString('default', { day: 'numeric' })
let month = date.toLocaleDateString('default', { month: 'long' });

//set days of week at bottom to next 5 days
let day2 = new Date(date.getTime() + 86400000).toLocaleDateString('default', { weekday: 'long' });
let day3 = new Date(date.getTime() + 86400000 * 2).toLocaleDateString('default', { weekday: 'long' });
let day4 = new Date(date.getTime() + 86400000 * 3).toLocaleDateString('default', { weekday: 'long' });
let day5 = new Date(date.getTime() + 86400000 * 4).toLocaleDateString('default', { weekday: 'long' });
let day6 = new Date(date.getTime() + 86400000 * 5).toLocaleDateString('default', { weekday: 'long' });

//Set Date in Navbar to Current Date
dateNav.textContent = `${longDay}, ${month} ${shortDay}`;

//Set Date in Center to Current Date
centerDay.textContent = `${longDay}`

//set dates in bottom
day2Day.textContent = `${day2}`
day3Day.textContent = `${day3}`
day4Day.textContent = `${day4}`
day5Day.textContent = `${day5}`
day6Day.textContent = `${day6}`

//get lat and lon
let lat;
let lon;

//Set up location and what to do if it succeeds
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
        console.log(weatherData.list[0].dt)
        
        //Use API Data to make and populate info
        let currentTemp = Math.round(weatherData.list[0].main.temp);
        centerTemp.textContent = `${currentTemp}°`
        
        let currentMin = Math.round(weatherData.list[0].main.temp_min);
        let currentMax = Math.round(weatherData.list[0].main.temp_max);
        minMax.textContent = `Min ${currentMin}°, Max ${currentMax}°`

        //fetch the API for Reverse Geolocation
        const locationPromise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`)
        const locationData = await locationPromise.json();

        //Add an if statement to check for if in US

        //set location in center to location
        let placeName = locationData[0].name;
        let stateName = locationData[0].state;

        //add an if no state do country

        centerLocation.textContent = `${placeName}, ${stateName}`;

        //Set up an iterator to parse through the dt
        //convert the dt to dates
        //Grab the Hi/Low of those dates by mathing the highest of the his and lowest of the lows and then save those
        //populate into ids
        
        //We need arrays of each list object that associates to each day, so day 1 would be the list objects of current day
        //make a 2d array of days with their 

     let tempMaxs = [];
     let tempMins = [];


        for(let i = 0; i < weatherData.list.length; i++){
            let unixTime = new Date(weatherData.list[i].dt * 1000)
            //console.log(unixTime.toLocaleDateString('en-US'))
            //console.log(unixTime)
            //console.log(weatherData.list[i].main.temp_max);
            //console.log(weatherData.list[i].main.temp_min);
            tempMaxs.push(weatherData.list[i].main.temp_max)
            tempMins.push(weatherData.list[i].main.temp_min)
        }
        //im thinking about using .map to do this better lol
        console.log(tempMaxs)
        console.log(tempMins)
    }
    apiCall();
}
//failure of grabbing location
function errorFunc() { };



