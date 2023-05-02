//global variables
var player = 0;
var cardsClicked = 0;
var lastCard = null;

// function to load text from another file into a DOM element
function loadFileInto(fromFile, whereTo) {

	// creating a new XMLHttpRequest object
	let ajax = new XMLHttpRequest();

	// defines the GET/POST method, source, and async value of the AJAX object
	ajax.open("GET", fromFile, true);

	// provides code to do something in response to the AJAX request
	ajax.onreadystatechange = function() {
			if ((this.readyState == 4) && (this.status == 200)) {
				document.querySelector(whereTo).innerHTML = this.responseText;
                console.log("Loaded " + fromFile + " into " + whereTo);

			} else if ((this.readyState == 4) && (this.status != 200)) {
                console.log( ("Could not load " + fromFile + " into " + whereTo + ". Specific error: "), this.responseText);
			}
		
	} // end ajax.onreadystatechange function

	// initiate request and wait for response
	ajax.send();
}

function double(array){
    const base = [];
    for(var i = 0; i<array.length; i++) {
     base.push(array[i], array[i]);   
    }
    return base;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
//taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array comments
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//adds boxes, taken and adapted from UP2
function addBox(){
    let newBox = document.createElement("a");
    document.querySelector("#container").appendChild(newBox);
    let current = this;
    newBox.addEventListener("click", boxEvent = (box) => {
        if (box.target.style.backgroundColor == "maroon"){
            //ignores selected or removed cards
        }
        else if (cardsClicked === 0){
           box.target.style.backgroundColor = "maroon"; 
           lastCard = box;
           cardsClicked++;
        }
        else{
            box.target.style.backgroundColor = "maroon";
            cardsClicked = 0;
            if(box.target.innerHTML == lastCard.target.innerHTML){
               //add point and remove if match
            }
            else{
               setTimeout(function(){
               box.target.style.backgroundColor = "black";
               lastCard.target.style.backgroundColor = "black";
               }, 1000); 
            }
        }
        
    });
}

//places cards into random boxes
function boxCards(array){
    shuffleArray(array);
    var counter = 0;
    var as = document.querySelectorAll('#container a'); 
        [].forEach.call(as, function(a) {
            a.innerHTML = array[counter];
            counter++;
        });
}

//loads content and setup, used as a main function for my page
document.addEventListener("DOMContentLoaded", function() {
    
    for(i = 0; i < 16; i++){
        addBox();
    }
    
    //creates shuffled card array
    var cards = new Array(1,2,3,4,5,6,7,8); //replace with files for AJAX loading
    cards = double(cards);
    boxCards(cards);
    
    //resets board
    let button = document.querySelector("#button");
    button.addEventListener("click", function(){
        boxCards(cards);
    });
    
});