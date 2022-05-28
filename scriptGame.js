// Pseudocode //
// Get input from player (rock, paper, or scissors)
// Store as playerSelection
// Generate random selection from (rock, paper, or scissors)
// Store as computerSelection
// Create rules for game (rock > scissor | scissors > paper | paper > rock)
// Compare playerSelection to computerSelection
// Display who won

let capitalize = function(string) {
    let lowerCase = string.toLowerCase();
    return lowerCase[0].toUpperCase() + lowerCase.substring(1);
}

// array to store string [rock paper scissors]
let selectionArray = ['Rock', 'Paper', 'Scissors'];
let result = 'default'

//selects at random from the rock paper scissors array
const computerSelection = selectionArray[Math.floor(Math.random() * selectionArray.length)];

//function to select the winner and print result
function gameRules(player, computer) {
    if (player === computer) {

    } else if ((player === 'Rock' || computer === 'Rock') && (player === 'Scissors' || computer === 'Scissors')) {
        if (player === 'Rock') {
            return result = 'You Win!'
        } else {
            return result = 'You Lose'
        }
    } else if ((player === 'Scissors' || computer === 'Scissors') && (player === 'Paper' || computer === 'Paper')) {
        if (player === 'Scissors') {
            return result = 'You Win!'
        } else {
            return result = 'You Lose'
        }
    } else if ((player === 'Paper' || computer === 'Paper') && (player === 'Rock' || computer === 'Rock')) {
        if (player === 'Paper') {
            return result = 'You Win!'
        } else {
            return result = 'You Lose'
        }
    }
}

function mainGame() {
    let p = 0;
    let c = 0;
    while (p <= 2 && c <= 2) {
        let playerSelection = capitalize(prompt("Choose your weapon:"));
        gameRules(playerSelection, computerSelection);

        if (result === 'You Win!') {
            p++;
        } else {
            c++;
        }

        console.log("Player Score:",p, "Computer Score:",c);
        continue;
    }

}

mainGame()
