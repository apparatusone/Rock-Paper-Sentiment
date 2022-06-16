const selectionArray = ['ROCK', 'PAPER', 'SCISSORS'];
const mainContainer = document.querySelector("#container");
const graphicsContainer = document.querySelector("#graphicscon");
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

// primary game function, sets computer selection, player selection, determines winner (or tie)

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

    healthBar();
}

function resetGame() {
    playScore = 5;
    compScore = 5;
    clearText();
    hideElements("#rps, .rpscon");
    unHideElements("#fightmenu, #fs");
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

// keyboard navigation of game

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
            move(5);
            arrow();
            selectionMenu(curSel.menu);
            console.log("test");
        break;
        case 66: // B
            if (curSel.menu === "rps") {
                hideElements("#rps, .rpscon");
                unHideElements("#fightmenu, #fs")
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

// navigates menus of arbitrary x/y dimensions using class names

function navFunc(curSel, x, y) { //generates class to navigate
    let menu = document.querySelectorAll(`.${curSel.menu}`);   //get items in current menu to find max array dimensions
    let xMenuDims = [], yMenuDims = []
    menu.forEach(ele => xMenuDims.push(ele.className.slice(1,2)));
    menu.forEach(ele => yMenuDims.push(ele.className.slice(3,4)));
    xMax = xMenuDims.reduce(function(a, b) {
                return Math.max(a, b);
                }, -Infinity);
    yMax = yMenuDims.reduce(function(a, b) {
        return Math.max(a, b);
        }, -Infinity);
    if (curSel.x + x === 0 || curSel.y + y === 0 || curSel.x + x > xMax || curSel.y + y > yMax) {
        return `x${curSel.x}y${curSel.y} ${curSel.menu} hideelement`;
    } else {
        curSel.x += x;
        curSel.y += y;
        return `x${curSel.x}y${curSel.y} ${curSel.menu} hideelement`;
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

// menu selector

function arrow() {
    let menu = document.querySelectorAll(`.${curSel.menu}`);
    menu.forEach(element => element.classList.add('hideelement'));

    let btn = document.querySelector(`[class=${CSS.escape(currentSelection)}]`);
    btn.classList.remove('hideelement')
    currentSelection = `x${curSel.x}y${curSel.y} ${curSel.menu}`;
};

// hide / unhide menus

function hideElements(...args) {
    let hide = document.querySelectorAll(...args);
    hide.forEach(element => element.classList.add('hideelement'));
}

function unHideElements(...args) {
    let hide = document.querySelectorAll(...args);
    hide.forEach(element => element.classList.remove('hideelement'));
}

async function hide(text){
    await typeText(text);
    setTimeout(() => {
        unHideElements(".rpscon, #rps, .fightmenu");
        clearText();
        locked = false;
    }, 1000);
    setTimeout(() => {
        gameOver()
    }, 4000);
}

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

function gameOver() {
    if (compScore === 0) {
        hideElements(".rpscon, #fightmenu, #fs, #rps");
        typeText("YOU WIN!");
        setTimeout(() => {
            resetGame()
        }, 2000);
        return true;
    } else if (playScore === 0) {
        hideElements(".rpscon, #fightmenu, #fs, #rps");
        typeText("YOU LOSE!");
        setTimeout(() => {
            resetGame()
        }, 2000);
        return true;
    } else {
        return false;
    }
};

function gameSequence() {
    mainGame(); 
    setTimeout(hideElements(".rpscon, #fightmenu, #fs, #rps"), 100); //hide all menus
    locked = true;
    hide(gameText(resultGame, player, computer));
    player = ""; //clear player selection
};

function selectionItem(item) {
    switch(item) {
        case "x1y2 main":
            hideElements(".rpscon, #fightmenu, #fs, #rps");
            unHideElements(".rpscon, #rps, .fightmenu")
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
            gameSequence();
        break;
        case "x1y3 rps":
            player = "PAPER";
            gameSequence();
        break;
        case "x1y2 rps":
            player = "SCISSORS";
            gameSequence();
        break;
    }

}

let textDiv = document.querySelector(".text");

let clearText = () => textDiv.textContent = "";

let interval = 50;

function typeText(text) {
    return new Promise((resolve) => {
        let i = 0;
        function myLoop() { 
            setTimeout(function() {
                let char = document.createTextNode(text[i]);
                if (text[i] === "#") {
                linebreak = document.createElement("br");
                textDiv.appendChild(linebreak);
                space = document.createElement("span"); //moves next line over 2 'pixels'
                space.style.cssText = "margin-left: .25em;"
                textDiv.appendChild(space);
            } else {
                textDiv.appendChild(char);
            };
            i++;
            if (i === text.length) {
                resolve("done");
            }
            if (i < text.length) {   //  if the counter < string length, call the loop function
                myLoop();
            }                       
        }, interval)               // set interval
        }
        myLoop();
    })
}

function gameText(result, player, computer) {
        console.log(result);
        switch(result) {
            case "win":
                return `PATROCLUS## used ${computer}!`;
            //break;
            case "lose":
                return `PATROCLUS## used ${computer}!`;
            break;
            case "tie":
                return `PATROCLUS## used ${computer}, TIE!`;
            break;
        }
}

function healthBar() {
    trainerHealth = document.querySelector("#trainerlife");
    playerHealth = document.querySelector("#playerlife");
    trainerBar = 7.2*(compScore/5);
    playerBar = 7.2*(playScore/5);
    trainerHealth.style.width = `${trainerBar}em`;
    playerHealth.style.width = `${playerBar}em`;
}

//buttons


// const upButton = document.querySelector("#upButton");
// console.log(upButton);
// upButton.addEventListener("click", move(1));
// moveUp

document.getElementById("upButton").onclick = function() {(move(2), arrow())};
document.getElementById("downButton").onclick = function() {(move(4), arrow())};
document.getElementById("leftButton").onclick = function() {(move(1), arrow())};
document.getElementById("rightButton").onclick = function() {(move(3), arrow())};
document.getElementById("aButton").onclick = function() {(
    move(5),
    arrow(),
    selectionMenu(curSel.menu)
)};
// document.getElementById("bButton").onclick = function() {()};

// function moveUp() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }


// animation stuff

//javaboy splash screen
const done = "done";

// await end of animation function

async function animationEnd(ele, animationType) {
    let promise = new Promise((resolve) => {
        ele.addEventListener(animationType, () => {
            console.log('finished');
            resolve("done");
        });
      });
      let result = await promise;
}

async function javaBoy() {
    await initialAnimation(done);
    const colors = ["#FFD757" , "#FF673F" , "#FFB6FB" , "#3ABA42" , "#3293F6"];

    mainContainer.classList.remove('hideelement');
    mainContainer.classList.add('fadein');
    
    function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
    function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

    async function javaboyReveal() {
        await delay(500);
        i = 1;
        for (const ele of colors) {
            svg = document.createElement("div");
            svg.setAttribute("id",`splash${i}`);
            svg.style.backgroundColor = ele;
            svg.style.webkitMaskImage = "url(img/javaboy.svg)";
            svg.style.maskImage = "url(img/javaboy.svg)";
            svg.style.maskMode = "alpha";
            svg.style.position = "absolute";
            svg.style.width = "24em";
            svg.style.height = "21.6em";
            graphicsContainer.append(svg);
            console.log(i);
            if (i === 5 ) {
                const animated = document.querySelector('#splash5');
                await animationEnd(animated, 'animationend');
            }
            i++
            await timer(150);
        }
    }

    async function remove() {
        await javaboyReveal(done);
        await delay(1);
        for (let i = 1; i < 5; i++) {
                let svgR = document.getElementById(`splash${i}`);
                svgR.remove();
        }
    };

    async function fadeout() {
        await remove(done);
        await delay (1000);
        let svgOpacity = document.getElementById('splash5');
        svgOpacity.classList.add('fadeout');
        const animated = document.querySelector('.fadeout');
        console.log(animated);
        await animationEnd(animated, 'transitionend');
    }   

    await fadeout();
    // return new Promise((resolve) => { resolve(done); });
}

// javaboy reveal

function initialAnimation() {
    const animContainer = document.querySelector(".handheld");
    const img = ["pcb", "extras", "case", "screenborder"];

    async function outline(done) {
        svg = document.createElement("object");
        svg.classList.add("cls-1");
        svg.style.position = "absolute";
        svg.setAttribute("type","image/svg+xml");
        svg.setAttribute("data","img/outline.svg");
        animContainer.append(svg);
        return new Promise(done => setTimeout(done, 1700));
    }

    async function layers() {
        await outline(done)
        i = 1;
        for (const ele of img) {
            svg = document.createElement("object");
            svg.setAttribute("id",`layer${i}`);
            svg.classList.add("swipereveal");
            svg.setAttribute("type","image/svg+xml");
            svg.setAttribute("data",`img/${ele}.svg`);
            animContainer.append(svg);
            i++
            await timer(1000);
        }
    }

    // outline();
    layers();

    function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
    return new Promise(done => setTimeout(done, 5700));
}

async function unhidemenus(...args) {
    await javaBoy(done);
    unHideElements(...args);
}

unhidemenus("#main, #fs, #tb, #pb, #cat, #livecon, #fightmenu, #controls");

// case 83: // S
//     interval = 5;   
//     console.log
// break;
  
  