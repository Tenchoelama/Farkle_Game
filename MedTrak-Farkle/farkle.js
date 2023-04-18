
// Define an empty array to hold dice objects 
var diceArr = [];


// Initialize the dice array with 6 dice objects
function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1); // error! it was cocatenating all data type as strings like ("die"+ i + 1) = die01
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	console.log(diceArr)
}

// Roll the dice and update the score
function rollDice(){
	for(var i=0; i < 6; i++){
		// Roll the dice that have not been clicked
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}

	// Update the dice images
	updateDiceImg();

	// Calculate the score and update the score display
	var score = calculatePoints()
    if (score > 0){
        var cscore = document.getElementById("cscore").innerHTML
        document.getElementById("cscore").innerHTML = Number(score) + Number(cscore)
    }
    else{
        document.getElementById("cscore").innerHTML = 0
    }

}

// Update the images of the dice based on their current values
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" + diceArr[i].value + ".png"; // error! it was originally selecting the index only but not the actual value at that index 
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

// Handle a click event on a dice element
function diceClick(img){

	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1; // error! it was checking the value instead of assigning it.  
	}
	else{
		diceArr[i].clicked = 0;
	}

}

/*this function calculates the score based on the current state of diceArr. It creates a counts object to store the number
	of times each value appears in the dice that are not clicked. It then iterates over the counts object to calculate the score based on the 
	given rules.
*/
function calculatePoints(){
	var score = 0
	var counts = {}

	for(var i =0; i < diceArr.length; i++){
		if (diceArr[i].clicked == 0) {
			var value = diceArr[i].value;
			if (counts[value]){
				counts[value]++;
			}
			else {
				counts[value] = 1
			}
		}
    }

	// Calculate the score based on the number of times each value appears
	for(var key in counts){
		if(counts[key] >= 3){
			let x = Math.floor(counts[key]/3)
			if(key == 1){
				score += 1000 * x
				counts[key] -= 3 * x
				score += (100*counts[key])
			}
			if(key == 2){
				score += 200 * x
			}
			if(key == 3){
				score += 300 * x
			}
			if(key == 4){
				score += 400 * x
			}
			if(key == 5){
				score += 500 * x
				counts[key] -= 3 * x
				score += (50*counts[key])
			}
			if(key == 6){
				score += 600 * x
			}
		
		}
		else if(key == 1){
			
			score += (100*counts[key])
		}
		else if(key == 5){
			
			score += (50*counts[key])
		}
		
	}
	 
	return score
}

// this function basically stores the current score to the BankScore and resets the current score to 0 
function reset(){
	var cscore = document.getElementById('cscore').innerHTML 
	var final_score = document.getElementById("total").innerHTML
	document.getElementById('total').innerHTML = Number(final_score) + Number(cscore)
	document.getElementById("cscore").innerHTML = 0

}


