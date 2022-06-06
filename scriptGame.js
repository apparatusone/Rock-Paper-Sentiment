// Pseudocode //
// Get input from player (rock, paper, or scissors)
// Store as playerSelection
// Generate random selection from (rock, paper, or scissors)
// Store as computerSelection
// Create rules for game (rock > scissor | scissors > paper | paper > rock)
// Compare playerSelection to computerSelection
// Display who won

let textDiv = document.querySelector(".text");

const selectionArray = ['ROCK', 'PAPER', 'SCISSORS'];
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
    } else if ((player === 'ROCK' || computer === 'ROCK') && (player === 'SCISSORS' || computer === 'SCISSORS')) {
        if (player === 'ROCK') {
            return result = win;
        } else {
            return result = lose;
        }
    } else if ((player === 'SCISSORS' || computer === 'SCISSORS') && (player === 'PAPER' || computer === 'PAPER')) {
        if (player === 'SCISSORS') {
            return result = win;
        } else {
            return result = lose;
        }
    } else if ((player === 'PAPER' || computer === 'PAPER') && (player === 'ROCK' || computer === 'ROCK')) {
        if (player === 'PAPER') {
            return result = win;
        } else {
            return result = lose;
        }
    }
    
}

let playScore = 5;
let compScore = 5;
let player = '';
let resultGame = '';
let computer = '';

function mainGame() {
    computer = computerSelection();
    gameRules(player, computer);

    if (result === win) {
        resultGame = "win"
        compScore--;
    } else if (result === lose) {
        resultGame = "lose"
        playScore--;
    } else {
        resultGame = "tie"
    }

    console.log("Player Score:",playScore, "Computer Score:",compScore);

    if (compScore === 0) {
        console.log("GAME OVER", win);
    } else if (playScore ===0) {
        console.log("GAME OVER", lose);
    }

    healthBar();
}

//gui

const curSel = new Object(); //object for selected menu item
curSel.x = 1;
curSel.y = 2;
curSel.menu = "main";
currentSelection = "x1y2 main"

window.addEventListener('keydown', keyPress);

locked = false //lock keyboard during a setTimeout, default is unlocked
function lockKeyboard (time) {
    locked = true;
    setTimeout(() => locked = false, time);
}

function keyPress(e) {
    if( locked ){
        e.preventDefault();
        return; 
     }
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
            console.log(locked)
            selectionMenu(curSel.menu);
        break;
        case 66: // B
            if (curSel.menu === "rps") {
                hideMenus()
                curSel.menu = "main";
                curSel.x = 1;
                curSel.y = 2;
                move(6);
                arrow();
            }
        break;  
        //default: return; // exit this handler for other keys
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
        case "main":
            selectionItem(currentSelection);
        break;
        case "rps":
            selectionItem(currentSelection);
        break;
    }

}

function hideMenus() {
    let hide = document.querySelectorAll(".rpsselection");
    hide.forEach(element => element.classList.add('hideelement'));
}

function hideMenusAll() {
    let hide = document.querySelectorAll(".rpsselection");
    hide.forEach(element => element.classList.add('hideelement'));

    let hide1 = document.querySelectorAll(".fightsvg");
    hide1.forEach(element => element.classList.add('hideelement'));

    let hide2 = document.querySelectorAll(".fightmenu");
    hide2.forEach(element => element.classList.add('hideelement'));
}

function unHideMenus() {
    let unhide = document.querySelectorAll(".rpsselection");
    unhide.forEach(element => element.classList.remove('hideelement'));

    let unhide1 = document.querySelectorAll(".fightsvg");
    unhide1.forEach(element => element.classList.remove('hideelement'));

    let unhide2 = document.querySelectorAll(".fightmenu");
    unhide2.forEach(element => element.classList.remove('hideelement'));
}

function selectionItem(item) {
    switch(item) {
        case "x1y2 main":
            unHideMenus()
            curSel.menu = "rps";
            curSel.x = 1;
            curSel.y = 4;
            move(5);
            arrow();
        break;
        case "x1y1 main":
        break;
        case "x2y2 main":
        break;
        case "x2y1 main":
        break;
        case "x1y4 rps":
            player = "ROCK";
            mainGame(); // delay testing
            setTimeout(hideMenusAll, 100);
            gameText(resultGame, player, computer)
            player = ""; //reset player
            lockKeyboard(3000);
            setTimeout(unHideMenus, 3000);
            setTimeout(hideText, 3000);
        break;
        case "x1y3 rps":
            player = "PAPER";
            mainGame(); // delay testing
            setTimeout(hideMenusAll, 100);
            gameText(resultGame, player, computer)
            player = ""; //reset player
            lockKeyboard(3000);
            setTimeout(unHideMenus, 3000);
            setTimeout(hideText, 3000);
        break;
        case "x1y2 rps":
            player = "SCISSORS";
            mainGame(); // delay testing
            setTimeout(hideMenusAll, 100);
            gameText(resultGame, player, computer)
            player = ""; //reset player
            lockKeyboard(3000);
            setTimeout(unHideMenus, 3000);
            setTimeout(hideText, 3000);
        break;
    }

}

function hideText() {
    textDiv.textContent = null;
}

function gameText(result, player, computer) {
    console.log(result, player, computer);
    switch(result) {
        case "win":
            textDiv.textContent = `TRAINER used ${computer}`
        break;
        case "lose":
            textDiv.textContent = `TRAINER used ${computer}`
        break;
        case "tie":
            textDiv.textContent = `TRAINER used ${computer} TIE`
        break;
    }
}

function healthBar() {
    trainerHealth = document.querySelector("#trainerlife");
    playerHealth = document.querySelector("#playerlife");
    trainerBar = 7.3*(compScore/5);
    playerBar = 7.3*(playScore/5);
    trainerHealth.style.width = `${trainerBar}em`;
    playerHealth.style.width = `${playerBar}em`;
}







