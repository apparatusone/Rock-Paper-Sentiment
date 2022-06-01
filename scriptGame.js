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
const selectionArray = ['Rock', 'Paper', 'Scissors'];
let result = 'default';
let win = 'You Win!';
let lose = 'You Lose';

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
            return result = win;
        } else {
            return result = lose;
        }
    } else if ((player === 'Scissors' || computer === 'Scissors') && (player === 'Paper' || computer === 'Paper')) {
        if (player === 'Scissors') {
            return result = win;
        } else {
            return result = lose;
        }
    } else if ((player === 'Paper' || computer === 'Paper') && (player === 'Rock' || computer === 'Rock')) {
        if (player === 'Paper') {
            return result = win;
        } else {
            return result = lose;
        }
    }
    
}

function mainGame() {
    let p = 5;
    let c = 5;
    while (p > 0 && c > 0) {
        //let player = capitalize(prompt("Choose your weapon:"));
        let player = 'Rock'
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


//gui code

function quadFunction(quad, x, y) { //generates class to navigate
    const myArray = quad.split("");
        if (parseInt(myArray[1])+parseInt(x) === 0 || parseInt(myArray[3])+parseInt(y) === 0 ||
                parseInt(myArray[1])+parseInt(x) > 2 || parseInt(myArray[3])+parseInt(y) > 2) {
            return quad;
        } else {
            let xOut = (parseInt(myArray[1]) + parseInt(x));
            let yOut = (parseInt(myArray[3]) + parseInt(y));
            return `${myArray[0]}${xOut}${myArray[2]}${yOut} menu`;
        }

}

let currentQuad = "x1y2 menu" //starting quadrant

window.addEventListener('keydown', keyPress);

//function navigation(e) {
//    console.log(e.keyCode);
//}

function keyPress(e) {
    switch(e.keyCode) {
        case 37: // left
           move(1);
        break;
        case 38: // up
            move(2);
        break;
        case 39: // right
           move(3);
        break;          
        case 40: // down
           move(4);
        break;          
        default: return; // exit this handler for other keys
    }
    e.preventDefault();
};

function move(direction){
    switch(direction){
        case 1://left
            return currentQuad = quadFunction(currentQuad, -1, 0);
        case 2://up
            return currentQuad = quadFunction(currentQuad, 0, 1);
        case 3://right
            return currentQuad = quadFunction(currentQuad, 1, 0);
        case 4://down
            return currentQuad = quadFunction(currentQuad, 0, -1);
    }
}

window.addEventListener('keydown', highlight);

function highlight() {
    let menu = document.querySelectorAll(".menu");
    menu.forEach(element => element.classList.remove('arrow'));

    let btn = document.querySelector(`[class=${CSS.escape(currentQuad)}]`);
    btn.classList.add('arrow')
};

