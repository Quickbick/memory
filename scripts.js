//global variables
var player = 0;
var cardsClicked = 0;
var lastCard = null;
var scores = [0,0];
var cards;

// pairs images of professors with the files containing their names
function filePair(a, b){
    this.name = a;
    this.img = b;
}

// function to load text from another file into a DOM element
function loadFileInto(fromFile, whereTo) {

	// creating a new XMLHttpRequest object
	let ajax = new XMLHttpRequest();

	// defines the GET/POST method, source, and async value of the AJAX object
	ajax.open("GET", fromFile, true);

	// provides code to do something in response to the AJAX request
	ajax.onreadystatechange = function() {
			if ((this.readyState == 4) && (this.status == 200)) {
				whereTo.innerHTML = this.responseText;
                console.log("Loaded " + fromFile + " into " + whereTo);

			} else if ((this.readyState == 4) && (this.status != 200)) {
                console.log( ("Could not load " + fromFile + " into " + whereTo + ". Specific error: "), this.responseText);
			}
		
	}; // end ajax.onreadystatechange function

	// initiate request and wait for response
	ajax.send();
}

//doubles each object in array to make double length array
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
    var newBox = document.createElement("a");
    document.querySelector("#container").appendChild(newBox);
    let current = this;
    newBox.addEventListener("click", boxEvent = (box) => {
        if (box.target.style.backgroundImage != 'none' && box.target.style.backgroundImage !== ""){
            //ignores selected or removed cards
        }
        else if (cardsClicked === 0){ //flips card for first card
           box.target.style.backgroundImage = "url(" + cards[box.target.id].img + ")";
           console.log(cards[box.target.id].img);
           lastCard = box;
           cardsClicked++;
        }
        else{ //flips second card
            box.target.style.backgroundImage = "url(" + cards[box.target.id].img + ")";
            cardsClicked = 0;
            if(box.target.innerHTML == lastCard.target.innerHTML){ //if cards match leaves them up and updates score
               scores[player] = scores[player] + 2;
            }
            else{ //reflips both cards
               setTimeout(function(){
               box.target.style.backgroundImage = 'none';
               box.target.style.backgroundColor = "black";
               lastCard.target.style.backgroundImage = 'none';
               lastCard.target.style.backgroundColor = "black";
               }, 1000); 
            }
            //updates scores at end of turn
            document.querySelector("#p1").innerHTML = scores[0];
            document.querySelector("#p2").innerHTML = scores[1];
            //changes player at end of turn
            if (player === 0){
                player = 1;
            }
            else{
                player = 0;
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
            loadFileInto(array[counter].name, a);
            a.setAttribute("id", counter);
            counter++;
        });
}

//loads content and setup, used as a main function for my page
document.addEventListener("DOMContentLoaded", function() {
    
    for(i = 0; i < 16; i++){
        addBox();
    }
    
    //creates shuffled card array
    var tor = new filePair("tor.html", "tor.jpg");
    var jordan = new filePair("jordan.html", "jordan.jpg");
    var dang = new filePair("dang.html", "dang.jpg");
    var andy = new filePair("andy.html", "andy.jpg");
    var cerruti = new filePair("cerruti.html", "cerruti.jpg");
    var remaley = new filePair("remaley.html", "remaley.jpg");
    var assefaw = new filePair("assefaw.html", "assefaw.jpg");
    var wang = new filePair("wang.html", "wang.png");
    cards = new Array(tor,jordan,dang,andy,cerruti,remaley,assefaw,wang);
    cards = double(cards);
    boxCards(cards);
    
    //resets board
    let button = document.querySelector("#button");
    button.addEventListener("click", function(){
        var as = document.querySelectorAll('#container a'); 
        for (let i = 0; i < as.length; i++) {
            as[i].remove();
        }
        for(i = 0; i < 16; i++){
            addBox();
        }
        boxCards(cards);
        scores[0] = 0; scores[1] = 0;
        document.querySelector("#p1").innerHTML = scores[0];
        document.querySelector("#p2").innerHTML = scores[1];
    });
});