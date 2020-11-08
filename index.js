// we need an input form
$(document).ready(function (){


$("#search-button").on("click", function(){

    var searchValue = $("search-value").val();
    
    $("#search-value").val("");
//need a variable for a search button
//going more into ajax call this time


function searchWeather(searchVlue) {

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=e8bb5a6ba8f08e6e176eb848cae16ef7",
        // my key "e8bb5a6ba8f08e6e176eb848cae16ef7"
        dataType: "json",
        // success: function
    }).then(data) {
        console.log(data);
        //create a history link for the search(Look up.push())


    }



}




})















})