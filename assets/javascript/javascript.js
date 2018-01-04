var topics =["Shih Tzu", "Husky", "Bulldog", "Beagle", "Poodle", "Chihuahua", "Boxer", "Rottweiler"];

function renderButtons(){
    //Delete content inside div to prevent repeat buttons
    $(".breedsLoc").empty();

    //generate button based off array
    for(var i = 0; i<topics.length; i++){
        var tempButton = $("<button>");
        tempButton.addClass("dog");
        tempButton.attr("data-name", topics[i]);
        tempButton.text(topics[i]);
        $(".breedsLoc").append(tempButton);
    }
}

//Adding a button
$(".breedSubmit").on("click", function(event){

    //Preventing submit button from trying to submit.
    //Optionally using a form so the user may hit enter to search instead of clicking button
    event.preventDefault();

    //Grabs input from textbox
    var breed = $(".dog-input").val();

    //Make sure input field isn't empty before adding button ie. no empty buttons
    if(breed){
        $(".breedsLoc").append("<button>" + breed + "</button>");
    }
    else{
       return;
    }

    //Breed from textbox is added to array
    topics.push(breed);

    renderButtons();
})

$(document).on("click", ".dog", function(){
    $(".breedDump").empty();
    var breed = $(this).attr("data-name");
    console.log(typeof(breed));
    console.log(breed);
    
    $(".giant").removeClass("blank");

    //search endpoint
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FY8bfi1LAkpNN1Y0gdWcLfVZrnRv5XXv&q=" + breed + "&limit=10&offset=0&rating=G&lang=en";
   
    //search API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        
        console.log(response);
        
        for(var i = 0; i< 10; i++){
        //data for still image
        var still = response.data[i].images.fixed_width_still.url;    
        //data for gif
        // var data = response.data[i].images.fixed_width.url;
        var data = response.data[i].images.fixed_width.url;
        var gifRating = response.data[i].rating;
        $(".breedDump").append("<img class = 'still " + i +"'  src ="+ still + ">" );
        $(".breedDump").append("<img class = 'gif  " + i +"' src ="+ data + ">" );
        }

        console.log(data);
       
    });

})

renderButtons();

$(document).on("click", ".still", function(){
    
    for(var i=0; i< 10; i++){
        if($(this).hasClass(i)){
            $("." + i).toggle();
        }
    }

});

$(document).on("click", ".gif", function(){
    
    for(var i=0; i< 10; i++){
        if($(this).hasClass(i)){
            $("." + i).toggle();
        }
    }

});