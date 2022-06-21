// Quotes API

const api_url ="https://api.adviceslip.com/advice";
const quoteArea= document.getElementById("quote")
function getapi(url)
{
fetch(api_url)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    
    quoteArea.textContent = data.slip.advice;
})
}

getapi(api_url);


// Weather API
const weatherKey = "af8df023e716fa9cc10ee93697bcbff5";
const weatherEL = document.getElementById("weather")
const iconEl = document.getElementById("weather-icon")

fetch(`https://api.openweathermap.org/data/2.5/weather?q=perth&appid=${weatherKey}&units=metric`)
.then(function (result) {
const weatherPromise = result.json()
return weatherPromise
})
.then(function (weatherPromise) {
    const weatherIcon = $("<img>")
   
    const temp = weatherPromise.main.temp
    const conditions = weatherPromise.weather[0].main


    $(weatherEL).text(temp + "° " + conditions)
    console.log(temp, conditions)
    
    if(temp < 25) {
        $(weatherIcon).attr("src", "icons/cold.png")
        $(weatherIcon).attr("height", "50px")
        $(iconEl).append(weatherIcon)
    } else {
        $(weatherIcon).attr("src", "icons/warm.png")
        $(weatherIcon).attr("height", "50px")
        $(iconEl).append(weatherIcon)
    }
    
})