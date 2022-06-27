const mainContent = document.getElementById("main");
const weatherEL = document.getElementById("weather");
const iconEl = document.getElementById("weather-icon");
const recipeEl = document.getElementById("recipe-container");
const recipeTitle = document.getElementById("recipe-title");
const recipeImgEl = document.getElementById("recipe-img-el");
const recipeText = document.getElementById("recipe-text");
const searchBtn = document.getElementById("search-button");

// HIDE RECIPE CONTAINER UNTIL CITY PROVIDED

mainContent.style.display = "none";

// Quotes API
const api_url = "https://api.adviceslip.com/advice";
const quoteArea = document.getElementById("quote");

function getapi(url) {
  fetch(api_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      quoteArea.textContent = data.slip.advice;
    });
}

getapi(api_url);

//  SEARCH FOR A CITY THEN REQUEST PROMISE

$(searchBtn).click(function () {
  // if table is already populated, clear it
  $("#recipe-img-el").empty();
  $(iconEl).empty();
  $("#recipe-text").empty();

  // get search city
  const userCityEl = document.getElementById("cityname");
  const userCity = $(userCityEl).val();
  const isHistory = localStorage.getItem(userCity);
  // if city has been searched before populate table

  if (isHistory) {
    mainContent.style.display = "";
    const previousCity = JSON.parse(window.localStorage.getItem(userCity));
    $("#recipe-title").text(previousCity.Title);
    const recipeImg = $("<img>");
    $(recipeImg).attr("class", "recipe-img");
    $(recipeImg).attr("src", previousCity.Img);
    $("#recipe-img-el").append(recipeImg);
    const recipeLink = $("<a>");
    $(recipeLink).attr("class", "link");
    $(recipeLink).attr(
      "href",
      "https://www.themealdb.com/meal/" + previousCity.Id
    );
    $(recipeLink).text("Here");
    $("#recipe-text").text(
      "Back for seconds? You've been here before! You can revisit this favourite "
    );
    $("#recipe-text").append(recipeLink);
  } else {
    // Weather API

    const weatherKey = "af8df023e716fa9cc10ee93697bcbff5";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${weatherKey}&units=metric`
    )
      .then(function (result) {
        if (result.status > 400) {
          alert("Please enter a valid city");
        }
        if (!userCity) {
          alert("Please enter a location");
        } else {
          const weatherPromise = result.json();
          return weatherPromise;
        }
      })
      .then(function (weatherPromise) {
        const weatherIcon = $("<img>");

        const temp = weatherPromise.main.temp;
        const conditions = weatherPromise.weather[0].main;

        $(weatherEL).attr("class", "left weather-el");
        $(weatherEL).text(temp + "° " + conditions);
        console.log(temp, conditions);

        // GENERATE COLD ICON

        if (temp < 25) {
          mainContent.style.display = "";
          $(weatherIcon).attr("src", "./assets/imgs/icons/cold.png");
          $(weatherIcon).attr("height", "50px");

          $(iconEl).append(weatherIcon);

          // GET COLD WEATHER OPTIONS

          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=british`,
            {
              mode: "cors",
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              const recipes = data.meals;
              const coldIndex = Math.floor(Math.random() * 57);
              $("#recipe-title").text(recipes[coldIndex].strMeal);
              const recipeImg = $("<img>");
              $(recipeImg).attr("class", "recipe-img");
              $(recipeImg).attr("src", recipes[coldIndex].strMealThumb);
              $("#recipe-img-el").append(recipeImg);
              const recipeId = recipes[coldIndex].idMeal;
              const recipeLink = $("<a>");
              $(recipeLink).attr("class", "link");
              $(recipeLink).attr(
                "href",
                "https://www.themealdb.com/meal/" + recipeId
              );
              $(recipeLink).text("Here");
              $("#recipe-text").text(
                "Escape the cold and find comfort in something that'll make you forget you haven't seen the sun in who knows how long! Find the recipe "
              );
              $("#recipe-text").append(recipeLink);



              // SAVE TO LOCAL STORAGE

              const coldRecipe = {
                Title: recipes[coldIndex].strMeal,
                Img: recipes[coldIndex].strMealThumb,
                Id: recipeId,
              };

              localStorage.setItem(userCity, JSON.stringify(coldRecipe));
            });
        } else {
          mainContent.style.display = "";

          // GENERATE WARM ICON
          $(weatherIcon).attr("src", "./assets/imgs/icons/warm.png");

          $(weatherIcon).attr("height", "50px");
          $(iconEl).append(weatherIcon);

          // GET WARM WEATHER RECIPES

          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=american`,
            {
              mode: "cors",
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              const recipes = data.meals;
              const warmIndex = Math.floor(Math.random() * 32);
              $("#recipe-title").text(recipes[warmIndex].strMeal);
              const recipeImg = $("<img>");
              $(recipeImg).attr("class", "recipe-img");
              $(recipeImg).attr("src", recipes[warmIndex].strMealThumb);
              $("#recipe-img-el").append(recipeImg);
              const recipeId = recipes[warmIndex].idMeal;
              const recipeLink = $("<a>");
              $(recipeLink).attr(
                "href",
                "https://www.themealdb.com/meal/" + recipeId
              );
              $(recipeLink).attr("class", "link");
              $(recipeLink).text("Here");
              $("#recipe-text").text(
                "Take your mind off the heat or whip this up to add a little something to an already fine day! Find the recipe "
              );
              $("#recipe-text").append(recipeLink);

              // SAVE TO LOCAL STORAGE

              const warmRecipe = {
                Title: recipes[warmIndex].strMeal,
                Img: recipes[warmIndex].strMealThumb,
                Id: recipeId,
              };

              localStorage.setItem(userCity, JSON.stringify(warmRecipe));
            });
        }
      });
  }

// Weather API
const weatherKey = "af8df023e716fa9cc10ee93697bcbff5";

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
        $(weatherIcon).attr("src", "./assets/imgs/icons/cold.png")
        $(weatherIcon).attr("height", "50px")
        $(iconEl).append(weatherIcon)
    } else {
        $(weatherIcon).attr("src", "./assets/imgs/icons/warm.png")
        $(weatherIcon).attr("height", "50px")
        $(iconEl).append(weatherIcon)
    }
    
})



});

