var searchKeyInuput = document.getElementById('searchKey');
var locationElement = document.querySelector(".location");
var degreeElement = document.querySelector('.degree .num span');
var currState = document.getElementById('currState');
var day2State = document.getElementById('day2State');
var maxDegDay2 = document.getElementById('maxDeg');
var minDegDay2 = document.getElementById('minDeg');
var maxDegDay3 = document.getElementById('maxDeg2');
var minDegDay3 = document.getElementById('minDeg2');
var day3State = document.getElementById('day3State');
var imgLogoDay1 = document.querySelector('img.img1')
var imgLogoDay2 = document.querySelector('img.img2')
var imgLogoDay3 = document.querySelector('img.img3')
var currDay = document.getElementById('currDay');
var nextDay1 = document.getElementById("nextDay1");
var nextDay2 = document.getElementById("nextDay2");
var currMonth = document.getElementById('currMonth');
var dir = document.getElementById('windDir');
var speed = document.getElementById('windSpeed');
var rain = document.getElementById("rain");
var finalData ='Cairo';
var windDirections = {
    "N": "North",
    "NE": "NorthEast",
    "E": "East",
    "SE": "SouthEast",
    "S": "South",
    "SW": "SouthWest",
    "W": "West",
    "NW": "NorthWest"
};


searchKeyInuput.addEventListener('input',function(){
    getWeather(searchKeyInuput.value);
});

async function getWeather(searchKey){ //searchKey
    var apiKey = '6d2df67b9bef400884e174824240104';
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchKey}&days=3`);
    finalData = await response.json();

    console.log(finalData);
    console.log('current weather:');
    console.log(finalData.current);
    console.log('Next 2 days:');
    console.log(finalData.forecast.forecastday.slice(1,3));
    console.log('state:');
    console.log(finalData.current.condition.text);
    console.log('state2 Max');
    console.log(finalData.forecast.forecastday.slice(1,3)[0].day.maxtemp_c);
    console.log('state2 Min');
    console.log(finalData.forecast.forecastday.slice(1,3)[0].day.mintemp_c);
    console.log('state day2');
    console.log(finalData.forecast.forecastday.slice(1,3)[0].day.condition.text);
    console.log('date');
    // console.log(Date(finalData.location.localtime.split(' ').splice(0,1)));
    var localTime = new Date(finalData.location.localtime );  // same => new Date() 
    var currDayName = localTime.toLocaleString('en-US',{weekday:'long'});
    var currMonthName = localTime.toLocaleString('en-US',{month:'long'});
    console.log(currDayName);
    var localTime2 = new Date(finalData.forecast.forecastday.slice(1,3)[0].date);
    var nextDayName1 = localTime2.toLocaleString('en-US',{weekday:'long'})
    console.log(nextDayName1);
    var localTime3 = new Date(finalData.forecast.forecastday.slice(1,3)[1].date);
    var nextDayName2 = localTime3.toLocaleString('en-US',{weekday:'long'})
    console.log(nextDayName2);

    locationElement.innerHTML = finalData.location.name;
    degreeElement.innerHTML = finalData.current.temp_c;
    currState.innerHTML = finalData.current.condition.text;
    maxDegDay2.innerHTML = finalData.forecast.forecastday.slice(1,3)[0].day.maxtemp_c;
    minDegDay2.innerHTML = finalData.forecast.forecastday.slice(1,3)[0].day.mintemp_c;
    day2State.innerHTML = finalData.forecast.forecastday.slice(1,3)[0].day.condition.text;
    maxDegDay3.innerHTML = finalData.forecast.forecastday.slice(1,3)[1].day.maxtemp_c;
    minDegDay3.innerHTML = finalData.forecast.forecastday.slice(1,3)[1].day.mintemp_c;
    day3State.innerHTML = finalData.forecast.forecastday.slice(1,3)[1].day.condition.text;
    imgLogoDay1.setAttribute('src',finalData.current.condition.icon);
    imgLogoDay2.setAttribute('src',`https:${finalData.forecast.forecastday.slice(1,3)[0].day.condition.icon}`);
    imgLogoDay3.setAttribute('src',`https:${finalData.forecast.forecastday.slice(1,3)[1].day.condition.icon}`);
    currDay.innerHTML = currDayName;
    nextDay1.innerHTML = nextDayName1;
    nextDay2.innerHTML = nextDayName2;
    currMonth.innerHTML = localTime.getDate()+currMonthName;
    console.log(`Day Num Of Month ${localTime.getDate()}`);
    // console.log(finalData.forecast.forecastday[0].date);

    var windDir = finalData.current.wind_dir;
    console.log(`Wind Direction: ${windDirections[windDir]}`);
    dir.innerHTML = windDirections[windDir];

    speed.innerHTML = `${finalData.current.wind_kph} km/h`;

    rain.innerHTML = `${finalData.forecast.forecastday[0].day.daily_chance_of_rain}%`
}
getWeather(finalData)