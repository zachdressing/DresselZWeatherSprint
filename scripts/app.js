//import Key
import {apiKey} from "./environment.js"

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

//fetch the API for weather
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=121.2908&appid=${apiKey}`)
        .then((response) => {
            return response.json
        })
        .then((data) => {
            console.log(data);
        })

