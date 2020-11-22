// we need an input form
// var citiesArray = [];

function renderButtons() {
    
    $("#city-list").empty();

    var citiesStorage = JSON.parse(localStorage.getItem("citiesArray")) || [];

    for(var i= 0; i < citiesStorage.length; i++) {

        var grabCity = citiesStorage[i];

        const searchedCity = document.createElement("input");

        searchedCity.setAttribute("type", "text");
        searchedCity.setAttribute("readonly", true);
        searchedCity.setAttribute("class", "form-control d-block bg-primary text-white");
        searchedCity.setAttribute("value", grabCity);
        searchedCity.addEventListener("click", function() {
            searchWeather(searchedCity.value);
            fiveDay(searchedCity.value);
        })
        // $("#city-list").append("<div class ='list-group'>"
        // + "<button class='list-btn'" + grabCity
        // + "</button>")
        $("#city-list").append(searchedCity);
    }
    // for (var i= 0; i < citiesArray.length; i++) {
    //     var cityBtn = $("<button>");

    //     cityBtn.addClass("city-btn");

    //     cityBtn.attr("data-name", citiesArray[i]);

    //     cityBtn.text(citiesArray[i]);

    //     $("#city-view").append(cityBtn);
    // }

// renderButtons();
}


$(".list-group").on("click", ".list-btn", function(event) {
    event.preventDefault();

    var cityList = ($(this).text());

    searchWeather(cityList);
})

//EVENT LISTENER for SEARCH
    $("#search-button").on("click", function(){
   

    var searchValue = $("#search-value").val();
    
    citiesArray = JSON.parse(localStorage.getItem("citiesArray")) || [];
    
    citiesArray.push(searchValue);

    localStorage.setItem("citiesArray", JSON.stringify(citiesArray));

    // renderButtons();
    // localStorage.setItem("citySearch",searchValue);
    // localStorage.getItem()

    $("#search-value").val("");
//need a variable for a search button
//going more into ajax call this time
    searchWeather(searchValue);
    // forecastWeather(searchValue);
    renderButtons();
    });

    var latitude = "";
    var longitude= "";

    function searchWeather(searchValue) {

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=e8bb5a6ba8f08e6e176eb848cae16ef7&units=imperial",
        // my key "e8bb5a6ba8f08e6e176eb848cae16ef7"
        dataType: "json",
        // success: function
    }).then(function(data) {
        console.log(data);
        //create a history link for the search(Look up.push())
        lat= data.coord.lat;
        lon= data.coord.lon;
        //create a card

        $("#today").empty();
        

        var title = $("<h3>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card col-md-10");
        var temp = $("<p>").addClass("card-text").text(`Temperature : ${data.main.temp}`);
        var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed}`);
        var humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity}`);
        
        
        var cardBody = $("<div>").addClass("card-body uv");
        cardBody.append(title, wind, humidity,temp)
        card.append(cardBody);
        $("#today").append(card);
        searchUV();
        forecastWeather(searchValue);
        
        }
    // searchUV()
    )}; ;

    function forecastWeather(searchValue) {
// a loop must be used to fetch the five day forecast with the openweather api
        $.ajax({

            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=b0d55d94d45640643224cf884f17469a&units=imperial`,
            dataType: "json",
        }).then(function(data){
            console.log(data);
            // console.log(data.list.length);

            // $("#forecast").empty();

            for (var i = 0; i < data.list.length; i+=8){
            // console.log(data.city.name);   
            var title = $("<h5>").addClass("card-title").text(data.list[i].dt_txt);
            var card = $("<div>").addClass("card col-md-2 fiveDay");
            var icon = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png">`;
            var temp = $("<p>").addClass("card-text").text(`Temperature : ${data.list[i].main.temp}`);
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.list[i].wind.speed}`);
            var humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.list[i].main.humidity}`);

            var cardBody = $("<div>").addClass("card-body");
            cardBody.append(title,icon, temp, wind, humidity);
            card.append(cardBody);
            console.log(1);
            // console.log(card)
            $("#today").append(card);
            //get the 5-day weather data
            //confirm you can modify content in the modal via css selector
            //format the data inside the modal from previod psuedocdoe
            }
        })
    }
    

    function searchUV (){

        $.ajax({

      
            // my key: "b0d55d94d45640643224cf884f17469a"
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b0d55d94d45640643224cf884f17469a&units=imperial`
        }).then(function(data){
        console.log(data);
        // lat= data.coord.lat;
        // lon= data.coord.lon;

        var uvIndex = $("<p>").addClass("card-text").text(`UV index: ${data.value}`);
        var button = $("<button>").addClass("btn uvIndex");
        button.append(uvIndex);
        $(".uv").append(button);

        if (data.value < 3) {
            $(".uvIndex").addClass("low");
        }
        else if (data.value <= 6) {
            $(".uvIndex").addClass("high");
        }
        else if (data.value > 8) {
            $(".uvIndex").addClass("veryHigh");
        }
      
        })
    }

    // $(document).on("click", ".city-btn", searchWeather,forecastWeather);

    $("#clear-button").on("click",function() {
        localStorage.clear();
    });
    // })

// for storage idea. could do a modal counter cliker/something like this or how many times. 

//grab a function to get the forcast for the days
    // use a for loop to loop over all forcasts(by specs)

//function to get a uv index( another url call)


//get a current search history, if there is any, then print it out

//we need to new array to store into the local storage
//we need to push the search value into that array
//we need to grab that value and place it into localstorage
//the alues are json. stringify the cities
// window.localStorage.setItem("cites", CitiesArray)
//when we click the button that we created, we want to put that value from that array IN LOCAL storage to that button so it works with the API
//cities = json.parse(getItem("cities")
// then a for loops















