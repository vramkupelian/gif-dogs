var topics =["bulldog", "beagle", "poodle", "chihuahua", "boxer", "rottweiler"];



function renderButtons(){

    //Delete content inside div to prevent repeat buttons
    $(".breedsLoc").empty();

    //Loop through array, generate buttons for each item in array
    for (var i = 0; i < topics.length; i++){
        $(".breedsLoc").append("<button class = 'dog-button' val = '" + topics[i] + "'>" + topics[i] + "</button>");
    }

}

//Adding a button
$(".breedSubmit").on("click", function(event){

    //Preventing submit button from trying to submit.
    //Optionally using a form so the user may hit enter to search instead of clicking button
    event.preventDefault();

    //Grabs input from textbox
    var breed = $(".dog-input").val();
    // var breed = $(".dog-input").val().trim();

    //Make sure input field isn't empty
    if(breed){
        $(".breedsLoc").append("<button class = 'dog-button' val = '" + breed + "'>" + breed + "</button>");
    }

    //Breed from textbox is added to array
    topics.push(breed);
})

$(".dog-button").on("click", function(){
    
    console.log(breed);
    var breed = $(".dog-button").val();
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=asPv1ZLZQXbN0L9Jpf8sTuS2c9vOiPMh&q=" + breed + "&limit=10&offset=0&rating=G&lang=en";

    //search API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
       $(".breedDump").html(JSON.stringify(response));
        $(".breedDump").append(response);
    });

})

renderButtons();

