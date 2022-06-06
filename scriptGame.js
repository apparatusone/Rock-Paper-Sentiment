// Pseudocode //
// Get input from player (rock, paper, or scissors)
// Store as playerSelection
// Generate random selection from (rock, paper, or scissors)
// Store as computerSelection
// Create rules for game (rock > scissor | scissors > paper | paper > rock)
// Compare playerSelection to computerSelection
// Display who won

const selectionArray = ['Rock', 'Paper', 'Scissors'];
let result = 'default';
let win = 'You Win!';
let lose = 'You Lose';

//selects at random from the rock paper scissors array
function computerSelection() {
    comp = selectionArray[Math.floor(Math.random() * selectionArray.length)];
    return comp;
} 

//function to select the winner and print result to console
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

let playScore = 5;
let compScore = 5;
let player = "";

function mainGame() {
    let computer = computerSelection();
    gameRules(player, computer);

    if (result === win) {
        compScore--;
    } else if (result === lose) {
        playScore--;
    }

    console.log("Player Score:",playScore, "Computer Score:",compScore);
    player = ""; //reset player

    if (compScore === 0) {
        console.log("GAME OVER", win);
    } else if (playScore ===0) {
        console.log("GAME OVER", lose);
    }

}

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
            selectionMenu(curSel.menu);
            //} else if(curSel.menu === "rps") {
            //    console.log(currentSelection);
            //    break;
            //}
        break;
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

function selectionMenu(menuItem) {
    switch(menuItem) {
        case "menu":
            console.log(currentSelection);
            selectionItem(currentSelection);
        break;
        case "rps":
            console.log(currentSelection);
            selectionItem(currentSelection);
        break;
    }

}

function selectionItem(item) {
    switch(item) {
        case "x1y2 menu":
            let unhide = document.querySelectorAll(".rpsselection");
            unhide.forEach(element => element.classList.remove('hideelement'));
            curSel.menu = "rps";
            curSel.x = 1;
            curSel.y = 4;
            move(5);
            arrow();
        break;
        case "x1y1 menu":
        break;
        case "x2y2 menu":
        break;
        case "x2y1 menu":
        break;
        case "x1y4 rps":
            player = "Rock";
            mainGame();
        break;
        case "x1y3 rps":
            player = "Paper";
            mainGame();
        break;
        case "x1y2 rps":
            player = "Scissors";
            mainGame();
        break;
    }

}




