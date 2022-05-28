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
let win = 'You Win!'
let lose = 'You Lose'

//selects at random from the rock paper scissors array
function computerSelection() {
    comp = selectionArray[Math.floor(Math.random() * selectionArray.length)];
    return comp;
} 

//function to select the winner and print result
function gameRules(player, computer) {
    console.log('Player:',player, 'Computer:', computer);
    if (player === computer) {
        return result = 'Tie';
    } else if ((player === 'Rock' || computer === 'Rock') && (player === 'Scissors' || computer === 'Scissors')) {
        if (player === 'Rock') {
            return result = win
        } else {
            return result = lose
        }
    } else if ((player === 'Scissors' || computer === 'Scissors') && (player === 'Paper' || computer === 'Paper')) {
        if (player === 'Scissors') {
            return result = win
        } else {
            return result = lose
        }
    } else if ((player === 'Paper' || computer === 'Paper') && (player === 'Rock' || computer === 'Rock')) {
        if (player === 'Paper') {
            return result = win
        } else {
            return result = lose
        }
    }
    
}

function mainGame() {
    let p = 5;
    let c = 5;
    while (p > 0 && c > 0) {
        let player = capitalize(prompt("Choose your weapon:"));
        let computer = computerSelection();
        gameRules(player, computer);

        if (result === win) {
            c--;
        } else if (result === lose) {
            p--;
        } else {
            continue;
        }

        console.log("Player Score:",p, "Computer Score:",c);
        continue;
    }

    if (c === 0) {
        console.log(win);
    } else {
        console.log(lose);
    }

}

mainGame()
