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
