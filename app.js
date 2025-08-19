import { Bone, bones } from "./javascript/boneConstruct.js";
import { showPopup, hidePopup } from "./javascript/popupLogic.js";
import { getRelativeDirection, endGame, saveGuess } from "./javascript/handleLogic.js";
import { dailyBone } from "./javascript/generateSeed.js";

// game state -> default is 0 (daily), 1 (endless)
let gameState = 0;

const swap_button = document.querySelector("button.gamemode-button");
swap_button.addEventListener("click", swapGamemodes);

// Input and button
const input = document.getElementById("myInput");
const button = document.querySelector("button.buttonf");
button.addEventListener("click", runInputHandler);

const reset_game_button = document.querySelector("button.reset-endless");
reset_game_button.addEventListener("click", resetGame);

// Info popup
const info_button = document.querySelector("button.info-button");
const info_button_return = document.querySelector("button.info-button-return");
info_button.addEventListener("click", showPopup);
info_button_return.addEventListener("click", hidePopup);

//rows and cell setup
const row = document.getElementsByClassName("row"); // Replace with dynamic logic
let cells;

// Storage
let prevGuesses = [];

// Random bone to guess
let targetBone = bones[Math.floor(Math.random() * bones.length)];
let guessCount = 0;

//Stores the current date for daily challenges
let d = new Date();
const sessionDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

function runInputHandler() {
    handleGuess(input.value.trim(), false);
}

// Enter key functionality
// This allows the user to press Enter to submit their guess
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // If input is not an exact match, autocomplete with the first suggestion
        const userInput = input.value.trim().toLowerCase();
        if (userInput) {
            const firstMatch = bones.find(b => b.name.toLowerCase().startsWith(userInput));
            if (firstMatch && firstMatch.name.toLowerCase() !== userInput) input.value = firstMatch.name;
            else handleGuess(input.value.trim(), false);
        }
    }
    if (event.key === "Tab") {
        const userInput = input.value.trim().toLowerCase();
        if (userInput) {
            const firstMatch = bones.find(b => b.name.toLowerCase().startsWith(userInput));
            if (firstMatch && firstMatch.name.toLowerCase() !== userInput) input.value = firstMatch.name;
        }
    }
});

function swapGamemodes() {
    if (gameState === 0) { //from daily to endless
        gameState = 1;
        resetGame();
        const resetButton = row[14].querySelector(".endless-repeat");
        resetButton.style.display = "flex"; // Shows the reset button in endless mode
    }
    else {
        gameState = 0;
        resetGame();
        displayPrevGuesses();
    }
    input.focus();
}

function resetGame() {
    const rows = document.getElementsByClassName("row");
    guessCount = 0;
    prevGuesses = [];
    [0, 1, 3, 5, 7, 9, 11].forEach(i => {
        rows[i].style.display = "none";
        const cells = row[i].querySelectorAll(".frame");
        cells.forEach((cell) => {
            cell.style.backgroundColor = "transparent";
        });
    });
    rows[14].style.display = "none"; // Hide the win row initially
    [2, 4, 6, 8, 10, 12, 13].forEach(i => {
        rows[i].style.display = "flex";
    });

    //sets title based on game state
    const doc_title = document.getElementsByClassName("header-title");
    if (gameState === 0)  {
        targetBone = dailyBone( sessionDate );
        doc_title[0].textContent = "Cadavle - Daily";
    }
    else {
        targetBone = bones[Math.floor(Math.random() * bones.length)];
        doc_title[0].textContent = "Cadavle - Endless";
    }
}

window.onload = function () {
    resetGame();
    if (gameState === 0) displayPrevGuesses();
    input.focus();
};

function displayPrevGuesses() {
    let d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    //const today = new Date().toISOString().split('T')[0];
    const existing = JSON.parse(localStorage.getItem(today)) || [];
    for (guessCount; guessCount < existing.length;) handleGuess(existing[guessCount], true);
}

function handleGuess(userInput, dontAnimate) {
    cells = row[guessCount * 2 + 1].querySelectorAll(".frame");
    if (!userInput) return; //makes sure there is an actual input

    //removes any case sensitivity and makes sure that the input is stored
    const guess = bones.find(b => b.name.toLowerCase() === userInput.toLowerCase());

    //code to make sure that the guess actually in the database
    const err_ouput = document.getElementsByClassName("error-output");
    if (!guess) {
        err_ouput[0].textContent = "Bone not found! Try another.";
        return;
    }

    if (guessCount > 0 && prevGuesses.includes(guess.name)) {
        err_ouput[0].textContent = "You already guessed that bone! Try another.";
        return;
    }

    err_ouput[0].textContent = ""; // Clear error message if guess is valid

    prevGuesses.push(guess.name);
    if (gameState === 0 && !dontAnimate) {
        // Save the guess to local storage for daily challenges
        saveGuess(guess.name, sessionDate);
    }

    // Clear input field
    input.value = "";

    // Render to a new row (you can improve this with better indexing)
    row[guessCount * 2 + 2].style.display = "none";
    row[guessCount++ * 2 + 1].style.display = "flex";

    const cellContents = [
        guess.name,
        guess.shape,
        getRelativeDirection(guess, targetBone),
        guess.length,
        guess.connects
    ];

    const titleContents = [
        "Bone",
        "Shape",
        "Direction",
        "Length (cm)",
        "Articulates"
    ]

    const upColor = "#B042FF"
    const downColor = "#E78F3A";
    const wrongColor = "#c14b2eff";
    const sameColor = "#56c079ff";

    if (!dontAnimate) {
        // Animate top UI row on first guess
        if (guessCount === 1) {
            row[0].style.display = "flex";
            const cellsOne = row[0].querySelectorAll(".frame");
            cellsOne.forEach((cell, i) => {
                setTimeout(() => {
                    cell.textContent = titleContents[i];
                    cell.classList.add("revealed");
                    setTimeout(() => cell.classList.remove("revealed"), 400);
                }, i * 180); // 180ms delay between each cell
            });
        }

        //Add inputed data into the cells
        cells.forEach((cell, i) => {
            // Clear content before reveal
            cell.textContent = "";
            setTimeout(() => {
                cell.textContent = cellContents[i];
                cell.classList.add("revealed");
                setTimeout(() => cell.classList.remove("revealed"), 400);
            }, i * 180); // 180ms delay between each cell
        });

        //Add the background color to the cells based on the guess
        cells.forEach((cell, i) => {
            cell.textContent = "";
            setTimeout(() => {
                cell.textContent = cellContents[i];
                cell.classList.add("revealed");

                // Animate background color in sync with reveal
                if (i === 1) { // shape
                    cell.style.backgroundColor = guess.shape !== targetBone.shape ? wrongColor : sameColor;
                }
                if (i === 2) { // direction
                    cell.style.backgroundColor = getRelativeDirection(guess, targetBone) !== "Same" ? upColor : sameColor;
                }
                if (i === 3) { // length
                    if (guess.length < targetBone.length) {
                        cell.style.backgroundColor = upColor;
                        cell.textContent += " ⬆️";
                    } else if (guess.length > targetBone.length) {
                        cell.style.backgroundColor = downColor;
                        cell.textContent += " ⬇️";
                    } else {
                        cell.style.backgroundColor = sameColor;
                    }
                }
                if (i === 4) { // connects
                    if (guess.connects < targetBone.connects) {
                        cell.style.backgroundColor = upColor;
                        cell.textContent += " ⬆️";
                    } else if (guess.connects > targetBone.connects) {
                        cell.style.backgroundColor = downColor;
                        cell.textContent += " ⬇️";
                    } else {
                        cell.style.backgroundColor = sameColor;
                    }
                }

                setTimeout(() => cell.classList.remove("revealed"), 400);
            }, i * 180);
        });
    }
    else {
        // Animate top UI row on first guess
        if (guessCount === 1) {
            row[0].style.display = "flex";
            const cellsOne = row[0].querySelectorAll(".frame");
            cellsOne.forEach((cell, i) => {
                setTimeout(() => {
                    cell.textContent = titleContents[i];
                    cell.classList.add("revealed");
                    setTimeout(() => cell.classList.remove("revealed"), 400);
                }, i); // 180ms delay between each cell
            });
        }

        //Add inputed data into the cells
        cells.forEach((cell, i) => {
            // Clear content before reveal
            cell.textContent = "";
            setTimeout(() => {
                cell.textContent = cellContents[i];
                cell.classList.add("revealed");
                setTimeout(() => cell.classList.remove("revealed"), 400);
            }, i); // 180ms delay between each cell
        });

        //Add the background color to the cells based on the guess
        cells.forEach((cell, i) => {
            cell.textContent = "";
            setTimeout(() => {
                cell.textContent = cellContents[i];
                cell.classList.add("revealed");

                // Animate background color in sync with reveal
                if (i === 1) { // shape
                    cell.style.backgroundColor = guess.shape !== targetBone.shape ? wrongColor : sameColor;
                }
                if (i === 2) { // direction
                    cell.style.backgroundColor = getRelativeDirection(guess, targetBone) !== "Same" ? upColor : sameColor;
                }
                if (i === 3) { // length
                    if (guess.length < targetBone.length) {
                        cell.style.backgroundColor = upColor;
                        cell.textContent += " ⬆️";
                    } else if (guess.length > targetBone.length) {
                        cell.style.backgroundColor = downColor;
                        cell.textContent += " ⬇️";
                    } else {
                        cell.style.backgroundColor = sameColor;
                    }
                }
                if (i === 4) { // connects
                    if (guess.connects < targetBone.connects) {
                        cell.style.backgroundColor = upColor;
                        cell.textContent += " ⬆️";
                    } else if (guess.connects > targetBone.connects) {
                        cell.style.backgroundColor = downColor;
                        cell.textContent += " ⬇️";
                    } else {
                        cell.style.backgroundColor = sameColor;
                    }
                }

                setTimeout(() => cell.classList.remove("revealed"), 400);
            }, i);
        });
    }

    //win condition
    if (guess.name === targetBone.name) {
        endGame( gameState, targetBone, row );
    }
    else if (guessCount >= 6) {
        endGame( gameState, targetBone, row );
    }
    input.focus();
}