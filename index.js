// we need an input form


    $("#search-button").on("click", function(){

    var searchValue = $("#search-value").val();
    
    $("#search-value").val("");
//need a variable for a search button
//going more into ajax call this time
    searchWeather(searchValue);
    });

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
        forecastWeather(searchValue);
        }
    )};

    function forecastWeather(searchValue) {

        $.ajax({

            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=b0d55d94d45640643224cf884f17469a&units=imperial`,
            dataType: "json",
        }).then(function(response){
            console.log(response)
            var title = $("<h5>").addClass("card-ttle").text(response.name);
            var card = $("<div>").addClass("card");
            var temp = $("<p>").addClass("card-text").text(`Temperature : ${response.list[0].main.temp}`);
            var wind = $("<p>").addClass("card-text").text(`Wind Speed: ${response.list[0].wind.speed}`);
            var humidity = $("<p>").addClass("card-text").text(`Humidity: ${response.list[0].main.humidity}`);

            var cardBody = $("<div").addClass("card-body");
            cardBody.append(title, temp, wind, humidity);
            card.append(cardBody);
            $("#forecast").append(card);

        })
    }
    


//grab a function to get the forcast for the days
    // use a for loop to loop over all forcasts(by specs)

//function to get a uv index( another url call)


//get a current search history, if there is any, then print it out

















