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

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '83aa4404bfmsh379d3c4ed348b21p1de7b9jsn565b913ecaf6',
		'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
	}
};
const recipeArea=document.getElementById("recipe")
function getapi(url)
fetch('https://webknox-recipes.p.rapidapi.com/recipes/156992/information', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

getapi(api_url);


