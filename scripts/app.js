//grab date
const date = new Date();

//grab formatted dates
let longDay = date.toLocaleDateString('default', {weekday: 'long'});
let shortDay = date.toLocaleDateString('default', {day: 'numeric'})
let month = date.toLocaleDateString('default', {month: 'long'});

//Log to confirm working
console.log(month);
console.log(longDay);
console.log(shortDay);