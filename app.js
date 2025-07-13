/* -- bone class -- */
class Bone {
    constructor(name, shape, position, length, connects, appendicular) {
        this.name = name;
        this.shape = shape;
        this.position = position;
        this.length = length;
        this.connects = connects;
        this.appendicular = appendicular;
    }
}

/*
-- directional coordinates --
Starting from the floor, we go upwards in the z, coronal plane is parallel with x-axis, sagital plane is parallel with y-axis
Directional Types:
"Lateral", "Medial", "Superior", "Inferior", "Anterior", "Posterior", "Distal", "Proximal"

Shape Types:
"Flat", "Long", "Short", "Sesamoid", "Irregular"
*/

const bones = [
    //new Bone("Femur", shape[1], {x: 1, y: 2, z: 1}, 45.72, 3, true),
    //new Bone("Scapula", shape[0], {x: 1, y: 1, z: 1}, 15.00, 2, false),
    //new Bone("Patella", shape[3], {x: 0, y: 0, z: 2}, 4.45, 2, true),

    // Sternum bones
    new Bone("Manubrium", "Flat", { x: 0, y: 9.7, z: 0.8 }, 5.0, 2, false),
    new Bone("Body of Sternum", "Flat", { x: 0, y: 9.3, z: 0.8 }, 12.0, 2, false),
    new Bone("Xiphoid Process", "Flat", { x: 0, y: 8.9, z: 0.8 }, 2.5, 1, false),

    // Clavicle & Scapula
    new Bone("Clavicle", "Long", { x: 1.1, y: 9.2, z: -0.2 }, 14.0, 2, false),
    new Bone("Scapula", "Flat", { x: 0.5, y: 9.4, z: -0.4 }, 15.0, 2, true),

    // Ribs - grouped and checked
    new Bone("True Ribs", "Flat", { x: 0.8, y: 9.3, z: 0.2 }, 26.6, 2, false),      // Ribs 1-7
    new Bone("False Ribs", "Flat", { x: 0.9, y: 8.5, z: 0.2 }, 22.0, 3, false),     // Ribs 8-10
    new Bone("Floating Ribs", "Flat", { x: 0.7, y: 7.9, z: 0.2 }, 18.2, 2, false),  // Ribs 11-12

    // Spine Bones - grouped and checked
    new Bone("Cervical Vertebrae", "Irregular", { x: 0, y: 10, z: 0 }, 2.5, 2, false),
    new Bone("Thoracic Vertebrae", "Irregular", { x: 0, y: 8.5, z: 0 }, 3.0, 4, false),
    new Bone("Lumbar Vertebrae", "Irregular", { x: 0, y: 6.2, z: 0 }, 3.5, 2, false),

    // Hip bones -- checked
    new Bone("Ilium", "Flat", { x: 0.5, y: 4.7, z: 0 }, 20.0, 3, false),
    new Bone("Ischium", "Irregular", { x: 0.4, y: 4.4, z: -0.3 }, 10.0, 2, false),
    new Bone("Pubis", "Irregular", { x: 0.4, y: 4.4, z: 0.3 }, 7.0, 3, false),
    new Bone("Sacrum", "Irregular", { x: 0, y: 4.4, z: -0.7 }, 11.0, 4, false),
    new Bone("Coccyx", "Irregular", { x: 0, y: 4.0, z: -0.7 }, 4.0, 1, false),

    //legs and feet -- checked
    new Bone("Femur", "Long", { x: 0, y: 4, z: 0 }, 45.72, 2, true),
    new Bone("Patella", "Sesamoid", { x: 0, y: 3.5, z: 0 }, 4.5, 0, true),
    new Bone("Tibia", "Long", { x: 0.5, y: 2.5, z: 0 }, 40.0, 2, true),
    new Bone("Fibula", "Long", { x: -0.5, y: 2.5, z: 0 }, 40.0, 2, true),
    new Bone("Talus", "Short", { x: 0, y: 1, z: 0 }, 5.0, 4, true),
    new Bone("Calcaneus", "Irregular", { x: 0, y: 0.7, z: 0 }, 5.5, 3, true),
    new Bone("Navicular", "Short", { x: 0.2, y: 0.4, z: 0 }, 4.0, 6, true),
    new Bone("Cuboid", "Short", { x: -0.2, y: 0.4, z: 0 }, 4.0, 5, true),
    new Bone("Medial Cuneiform", "Short", { x: 0.3, y: 0.1, z: 0 }, 2.0, 4, true),
    new Bone("Intermediate Cuneiform", "Short", { x: 0, y: 0.1, z: 0 }, 2.0, 4, true),
    new Bone("Lateral Cuneiform", "Short", { x: -0.3, y: 0.1, z: 0 }, 2.0, 6, true),
    new Bone("Metatarsals", "Long", { x: 0, y: -0.2, z: 0 }, 5.0, 2, true),
    new Bone("Foot Phalanges", "Long", { x: 0, y: -0.5, z: 0 }, 2.5, 2, true),
];

// Random bone to guess
let targetBone = bones[Math.floor(Math.random() * bones.length)];
let guessCount = 0;

// Input and button
const input = document.getElementById("myInput");
const button = document.querySelector("button.buttonf");
button.addEventListener("click", handleGuess);

// Storage
let prevGuesses = [];

function getRelativeDirection(guess, target) {
    const dx = target.position.x - guess.position.x;
    const dy = target.position.y - guess.position.y;
    const dz = target.position.z - guess.position.z;

    let direction = "";

    // Compare absolute values to find strongest axis of difference
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const absDz = Math.abs(dz);

    if (absDx > absDy && absDx > absDz) {
        direction = dx > 0 ? "Medial" : dx < 0 ? "Lateral" : "Same";
    } else if (absDy >= absDx && absDy >= absDz) {
        if (guess.appendicular) {
            direction = dy > 0 ? "Proximal" : dy < 0 ? "Distal" : "Same";
        } else {
            direction = dy > 0 ? "Superior" : dy < 0 ? "Inferior" : "Same";
        }
    } else {
        direction = dz > 0 ? "Posterior" : dz < 0 ? "Anterior" : "Same";
    }

    return direction;
}

window.onload = function () {
    const rows = document.getElementsByClassName("row");
    // Hide rows at index 0, 2, 4, 6, 8, 10
    [0, 2, 4, 6, 8, 10].forEach(i => {
        if (rows[i]) {
            rows[i].style.display = "none";
        }
    });
};

const answer = document.getElementsByClassName("answer")[0];
//answer.textContent = targetBone.name + " is the bone you are looking for!";

const boneSelector = document.getElementById("boneList");
bones.forEach(bone => {
    const option = document.createElement("option");
    option.value = bone.name;
    boneSelector.appendChild(option);
});

// Enter key functionality
// This allows the user to press Enter to submit their guess
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // If input is not an exact match, autocomplete with the first suggestion
        const userInput = input.value.trim().toLowerCase();
        if (userInput) {
            const firstMatch = bones.find(b => b.name.toLowerCase().startsWith(userInput));
            if (firstMatch && firstMatch.name.toLowerCase() !== userInput) input.value = firstMatch.name;
            else handleGuess();
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

function handleGuess() {
    const userInput = input.value.trim();
    if (!userInput) return; //makes sure there is an actual input

    //removes any case sensitivity and makes sure that the input is stored
    const guess = bones.find(b => b.name.toLowerCase() === userInput.toLowerCase());

    //code to make sure that the guess actually in the database
    if (!guess) {
        alert("Bone not found! Try another.");
        return;
    }

    if (guessCount > 0 && prevGuesses.includes(guess.name)) {
        alert("You already guessed that bone! Try another.");
        return;
    }

    prevGuesses.push(guess.name);

    // Clear input field
    input.value = "";

    // Render to a new row (you can improve this with better indexing)
    const row = document.getElementsByClassName("row"); // Replace with dynamic logic
    const cells = row[guessCount * 2].querySelectorAll(".frame");
    row[guessCount * 2 + 1].style.display = "none";
    row[guessCount++ * 2].style.display = "flex";

const cellContents = [
    guess.name,
    guess.shape,
    getRelativeDirection(guess, targetBone),
    guess.length,
    guess.connects
];

cells.forEach((cell, i) => {
    // Clear content before reveal
    cell.textContent = "";
    setTimeout(() => {
        cell.textContent = cellContents[i];
        cell.classList.add("revealed");
        setTimeout(() => cell.classList.remove("revealed"), 400);
    }, i * 180); // 180ms delay between each cell
});

    const upColor = "#B042FF"
    const downColor = "#E78F3A";
    const wrongColor = "#c14b2eff";
    const sameColor = "#56c079ff";

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

    //win condition
    if (guess.name === targetBone.name) {
        answer.textContent = `Congratulations! You found the ${targetBone.name} in ${guessCount} guesses!`;
        button.disabled = true; // Disable button after correct guess
    }
    else if (guessCount >= 6) {
        answer.textContent = `Game over! The correct bone was ${targetBone.name}.`;
        button.disabled = true; // Disable button after max guesses
    }
}