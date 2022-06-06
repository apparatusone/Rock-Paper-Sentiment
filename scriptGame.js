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

const curSel = new Object(); //object for selected menu item
curSel.x = 1;
curSel.y = 2;
curSel.menu = "menu"; //temp change to menu
currentSelection = "x1y2 menu"

window.addEventListener('keydown', keyPress);

function keyPress(e) {
    switch(e.keyCode) {
        case 37: // left
           move(1);
           arrow();
        break;
        case 38: // up
            move(2);
            arrow();
        break;
        case 39: // right
            move(3);
            arrow();
        break;          
        case 40: // down
            move(4);
            arrow();
        break;
        case 65: // A
            if (curSel.menu === "menu") {
                let unhide = document.querySelectorAll(".rpsselection");
                unhide.forEach(element => element.classList.remove('hideelement'));
                curSel.menu = "rps";
                curSel.x = 1;
                curSel.y = 4;
                console.log(curSel);
                move(5);
                arrow();
                break;
            } else if(curSel.menu === "rps") {
                console.log(currentSelection);
                break;
            }
        case 66: // B
            if (curSel.menu === "rps") {
                let hide = document.querySelectorAll(".rpsselection");
                hide.forEach(element => element.classList.add('hideelement'));
                curSel.menu = "menu";
                curSel.x = 1;
                curSel.y = 2;
                move(6);
                arrow();
            }
        break;  
        default: return; // exit this handler for other keys
    }
    e.preventDefault();
};

function navFunc(curSel, x, y) { //generates class to navigate
    let menu = document.querySelectorAll(`.${curSel.menu}`);   //get items in current menu to find max array dimensions
    xMenuDims = []
    yMenuDims = []
    menu.forEach(ele => xMenuDims.push(ele.className.slice(1,2)));
    menu.forEach(ele => yMenuDims.push(ele.className.slice(3,4)));
    xMax = xMenuDims.reduce(function(a, b) {
                return Math.max(a, b);
                }, -Infinity);
    yMax = yMenuDims.reduce(function(a, b) {
        return Math.max(a, b);
        }, -Infinity);
    if (curSel.x + x === 0 || curSel.y + y === 0 || curSel.x + x > xMax || curSel.y + y > yMax) {
        return `x${curSel.x}y${curSel.y} ${curSel.menu}`;
    } else {
        curSel.x += x;
        curSel.y += y;
        return `x${curSel.x}y${curSel.y} ${curSel.menu}`;
    };
}

function move(direction){
    switch(direction){
        case 1://left
            return currentSelection = navFunc(curSel, -1, 0);
        case 2://up
            return currentSelection = navFunc(curSel, 0, 1);
        case 3://right
            return currentSelection = navFunc(curSel, 1, 0);
        case 4://down
            return currentSelection = navFunc(curSel, 0, -1);
        case 5://a
            return currentSelection = navFunc(curSel, 0, 0);
        case 6://b
            return currentSelection = navFunc(curSel, 0, 0);
    }
}

function arrow() {
    let menu = document.querySelectorAll(`.${curSel.menu}`);
    menu.forEach(element => element.classList.remove('arrow'));

    let btn = document.querySelector(`[class=${CSS.escape(currentSelection)}]`);
    btn.classList.add('arrow')
};




