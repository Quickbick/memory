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

//adds boxes, taken and adapted from UP2
function addBox(){
    let newBox = document.createElement("a");
    document.querySelector("#container").appendChild(newBox);
    let current = this;
}

//loads boxes and reset button, taken and adapted from UP2
document.addEventListener("DOMContentLoaded", function() {
    
    for(i = 0; i < 16; i++){
        addBox();
    }
    let button = document.querySelector("#button");
    button.addEventListener("click", function(){
        //loops through all boxes and empties them
        var as = document.querySelectorAll('#container a'); 
        [].forEach.call(as, function(a) {
            a.innerHTML = "";
        });
    });
    
});