/* -- bone class -- */
class Bone {
    constructor(name, shape, position, length, connects, grouping) {
        this.name = name;
        this.shape = shape;
        this.position = position;
        this.length = length;
        this.connects = connects;
        this.grouping = grouping;
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
    // Cranial bones
    new Bone("Occipital", "Flat", { x: 0, y: 11.1, z: -0.7 }, 5.5, 6, 3),
    new Bone("Parietal", "Flat", { x: 0.3, y: 11.5, z: -0.5 }, 6.0, 5, 3),
    new Bone("Frontal", "Flat", { x: 0, y: 11.6, z: 0.2 }, 5.0, 12, 3),
    new Bone("Temporal", "Irregular", { x: 0.7, y: 10.9, z: -0.4 }, 4.5, 5, 3),
    new Bone("Sphenoid", "Irregular", { x: 0, y: 10.8, z: -0.2 }, 4.0, 12, 3),
    new Bone("Ethmoid", "Irregular", { x: 0, y: 11, z: 0.2 }, 2.5, 13, 3),

    // Facial bones
    new Bone("Nasal", "Flat", { x: 0, y: 11.1, z: 0.5 }, 2.0, 4, 2),
    new Bone("Maxilla", "Irregular", { x: 0, y: 10.7, z: 0.7 }, 6.0, 9, 2),
    new Bone("Lacrimal", "Flat", { x: 0.2, y: 11, z: 0.5 }, 1.0, 4, 2),
    new Bone("Zygomatic", "Irregular", { x: 0.7, y: 10.9, z: 0.4 }, 3.0, 4, 2),
    new Bone("Palatine", "Irregular", { x: 0.1, y: 10.6, z: 0.2 }, 2.0, 6, 2),
    new Bone("Inferior Nasal Concha", "Irregular", { x: 0.1, y: 10.6, z: 0.5 }, 1.5, 3, 2),
    new Bone("Vomer", "Flat", { x: 0, y: 10.5, z: 0.3 }, 1.5, 6, 2),
    new Bone("Hyoid", "Irregular", { x: 0, y: 9.8, z: 0.4 }, 1.2, 0, 2),
    new Bone("Mandible", "Irregular", { x: 0, y: 10.2, z: 0.7 }, 8.0, 2, 2),

    // Ear bones
    new Bone("Malleus", "Irregular", { x: 0.9, y: 10.9, z: -0.4 }, 0.85, 3, 2),
    new Bone("Incus", "Irregular", { x: 0.89, y: 10.9, z: -0.4 }, 0.7, 2, 2),
    new Bone("Stapes", "Irregular", { x: 0.88, y: 10.9, z: -0.4 }, 0.3, 2, 2),

    // Carpals - grouped checked
    new Bone("Scaphoid", "Short", { x: 2.0, y: 5.4, z: 0 }, 2.8, 5, 1),
    new Bone("Lunate", "Short", { x: 1.7, y: 5.4, z: 0 }, 2.0, 5, 1),
    new Bone("Triquetral", "Short", { x: 1.6, y: 5.3, z: 0 }, 2.0, 3, 1),
    new Bone("Pisiform", "Short", { x: 1.6, y: 5.3, z: 0.2 }, 1.5, 1, 1),
    new Bone("Trapezium", "Short", { x: 2.1, y: 5.1, z: 0 }, 1.8, 4, 1),
    new Bone("Trapezoid", "Short", { x: 1.9, y: 5.1, z: 0 }, 1.7, 4, 1),
    new Bone("Capitate", "Short", { x: 1.7, y: 5.0, z: 0 }, 2.9, 7, 1),
    new Bone("Hamate", "Short", { x: 1.5, y: 5.0, z: 0 }, 2.3, 5, 1),

    // Metacarpals + Phalanges - grouped checked
    new Bone("Metacarpals", "Long", { x: 1.7, y: 4.7, z: 0 }, 5.0, 2, 1),
    new Bone("Hand Phalanges", "Long", { x: 1.7, y: 4.2, z: 0 }, 2.5, 2, 1),

    // Upper limbs - checked
    new Bone("Humerus", "Long", { x: 1.5, y: 8.2, z: 0 }, 35.0, 3, 1),
    new Bone("Ulna", "Long", { x: 1.8, y: 6.0, z: 0 }, 26.0, 2, 1),
    new Bone("Radius", "Long", { x: 2.0, y: 6.0, z: 0 }, 24.0, 4, 1),

    // Sternum bones - checked
    new Bone("Manubrium", "Flat", { x: 0, y: 9.7, z: 0.8 }, 5.0, 2, 2),
    new Bone("Body of Sternum", "Flat", { x: 0, y: 9.3, z: 0.8 }, 12.0, 2, 2),
    new Bone("Xiphoid Process", "Flat", { x: 0, y: 8.9, z: 0.8 }, 2.5, 1, 2),

    // Clavicle & Scapula - checked
    new Bone("Clavicle", "Long", { x: 1.1, y: 9.2, z: -0.2 }, 14.0, 2, 2),
    new Bone("Scapula", "Flat", { x: 0.5, y: 9.4, z: -0.4 }, 15.0, 2, 2),

    // Ribs - grouped and checked
    new Bone("True Ribs", "Flat", { x: 0.8, y: 9.3, z: 0.2 }, 26.6, 2, 2),      // Ribs 1-7
    new Bone("False Ribs", "Flat", { x: 0.9, y: 8.5, z: 0.2 }, 22.0, 3, 2),     // Ribs 8-10
    new Bone("Floating Ribs", "Flat", { x: 0.7, y: 7.9, z: 0.2 }, 18.2, 1, 2),  // Ribs 11-12

    // Spine Bones - grouped and checked
    new Bone("Cervical Vertebrae", "Irregular", { x: 0, y: 10, z: 0 }, 2.5, 2, 2),
    new Bone("Thoracic Vertebrae", "Irregular", { x: 0, y: 8.5, z: 0 }, 3.0, 4, 2),
    new Bone("Lumbar Vertebrae", "Irregular", { x: 0, y: 6.2, z: 0 }, 3.5, 2, 2),

    // Hip bones -- checked
    new Bone("Ilium", "Flat", { x: 0.5, y: 4.7, z: 0 }, 20.0, 3, 2),
    new Bone("Ischium", "Irregular", { x: 0.4, y: 4.4, z: -0.3 }, 10.0, 2, 2),
    new Bone("Pubis", "Irregular", { x: 0.4, y: 4.4, z: 0.3 }, 7.0, 3, 2),
    new Bone("Sacrum", "Irregular", { x: 0, y: 4.4, z: -0.7 }, 11.0, 4, 2),
    new Bone("Coccyx", "Irregular", { x: 0, y: 4.0, z: -0.7 }, 4.0, 1, 2),

    //legs and feet -- checked
    new Bone("Femur", "Long", { x: 0, y: 4, z: 0 }, 45.72, 2, 0),
    new Bone("Patella", "Sesamoid", { x: 0, y: 3.5, z: 0 }, 4.5, 0, 0),
    new Bone("Tibia", "Long", { x: -0.5, y: 2.5, z: 0 }, 40.0, 2, 0),
    new Bone("Fibula", "Long", { x: 0.5, y: 2.5, z: 0 }, 40.0, 2, 0),
    new Bone("Talus", "Short", { x: 0, y: 1, z: 0 }, 5.0, 4, 0),
    new Bone("Calcaneus", "Irregular", { x: 0, y: 0.7, z: 0 }, 5.5, 3, 0),
    new Bone("Navicular", "Short", { x: 0.2, y: 0.4, z: 0 }, 4.0, 6, 0),
    new Bone("Cuboid", "Short", { x: 0.4, y: 0.2, z: 0 }, 4.0, 5, 0),
    new Bone("Medial Cuneiform", "Short", { x: -0.2, y: 0.1, z: 0 }, 2.0, 4, 0),
    new Bone("Intermediate Cuneiform", "Short", { x: 0, y: 0.1, z: 0 }, 2.0, 4, 0),
    new Bone("Lateral Cuneiform", "Short", { x: 0.2, y: 0.1, z: 0 }, 2.0, 6, 0),
    new Bone("Metatarsals", "Long", { x: 0, y: -0.2, z: 0 }, 5.0, 2, 0),
    new Bone("Foot Phalanges", "Long", { x: 0, y: -0.5, z: 0 }, 2.5, 2, 0),
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
        direction = dx > 0 ? "Lateral" : dx < 0 ? "Medial" : "Same";
    } else if (absDy >= absDx && absDy >= absDz) {
        if (guess.grouping === target.grouping && guess.grouping !== 2) {
            direction = dy > 0 ? "Proximal" : dy < 0 ? "Distal" : "Same";
        } else {
            direction = dy > 0 ? "Superior" : dy < 0 ? "Inferior" : "Same";
        }
    } else {
        direction = dz > 0 ? "Anterior" : dz < 0 ? "Posterior" : "Same";
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
    input.focus();
}