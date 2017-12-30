var topics =["bulldog", "beagle", "poodle", "chihuahua", "boxer", "rottweiler"];

function renderButtons(){
    //Delete content inside div to prevent repeat buttons
    $(".breedsLoc").empty();

    //generate button based off array
    for(var i = 0; i<topics.length; i++){
        var a = $("<button>");
        a.addClass("dog");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $(".breedsLoc").append(a);
    }
}

//Adding a button
$(".breedSubmit").on("click", function(event){

    //Preventing submit button from trying to submit.
    //Optionally using a form so the user may hit enter to search instead of clicking button
    event.preventDefault();

    //Grabs input from textbox
    var breed = $(".dog-input").val();

    //Make sure input field isn't empty
    if(breed){
        $(".breedsLoc").append("<button>" + breed + "</button>");
    }

    //Breed from textbox is added to array
    topics.push(breed);

    renderButtons();
})

$(document).on("click", ".dog-button", function(){
    
    var breed = $(".dog-button").val();
    console.log(typeof(breed));
    console.log(breed);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=asPv1ZLZQXbN0L9Jpf8sTuS2c9vOiPMh&q=" + breed + "&limit=10&offset=0&rating=G&lang=en";

    //search API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
       $(".breedDump").html(JSON.stringify(response));
        // $(".breedDump").append(response);
    });

})

renderButtons();