// we need an input form


    $("#search-button").on("click", function(){

    var searchValue = $("#search-value").val();
    
    $("#search-value").val("");
//need a variable for a search button
//going more into ajax call this time
    searchWeather(searchValue);
    forecastWeather(searchValue);
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

        //create a card

        $("#today").empty();

        var title = $("<h3>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card");
        var temp = $("<p>").addClass("card-text").text(`Temperature : ${data.main.temp}`);
        var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.wind.speed}`);
        var humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.main.humidity}`);
        
        
        var cardBody = $("<div>").addClass("card-body");
        cardBody.append(title, wind, humidity,temp)
        card.append(cardBody);
        $("#today").append(card);
        // forecastWeather(searchValue);
        }
    )};

    function forecastWeather(searchValue) {
// a loop must be used to fetch the five day forecast with the openweather api
        $.ajax({

            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=b0d55d94d45640643224cf884f17469a&units=imperial`,
            dataType: "json",
        }).then(function(data){
            console.log(data);
            // console.log(data.list.length);

            for (var i = 0; i < data.list.length; i+=8){
            // console.log(data.city.name);   
            var title = $("<h5>").addClass("card-title").text(data.list[i].dt_txt);
            var card = $("<div>").addClass("card col-md-2 fiveDay");
            var icon = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[i].icon}.png">`;
            var temp = $("<p>").addClass("card-text").text(`Temperature : ${data.list[i].main.temp}`);
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${data.list[i].wind.speed}`);
            var humidity = $("<p>").addClass("card-text").text(`Humidity: ${data.list[i].main.humidity}`);

            var cardBody = $("<div>").addClass("card-body");
            cardBody.append(title, icon, temp, wind, humidity);
            card.append(cardBody);
            console.log(1);
            // console.log(card)
            $("#forecast").append(card);
            //get the 5-day weather data
            //confirm you can modify content in the modal via css selector
            //format the data inside the modal from previod psuedocdoe
            }
        })
    }
    
    list[0].weather[0].icon
    function searchUV (){

        $.ajax({

           
            // my key: "b0d55d94d45640643224cf884f17469a"
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b0d55d94d45640643224cf884f17469a&units=imperial`
        }).then(function(data){
        console.log(data);
        latitude= data.coord.lat;
        longitude= data.coord.lon;

        var uvIndex = $("<p>").addClass("card-text").text("UV index: ")
        })

        

    }
// for storage idea. could do a modal counter cliker/something like this or how many times. 

//grab a function to get the forcast for the days
    // use a for loop to loop over all forcasts(by specs)

//function to get a uv index( another url call)


//get a current search history, if there is any, then print it out

















