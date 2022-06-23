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

//recipe api

const searchBtn = document.getElementById('search-btn');
const mealContent = document.querySelector('meal');
// searchBtn.addEventListener('click', getMealContent);
function getMealContent() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`,{
        mode: "cors"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}
getMealContent();

