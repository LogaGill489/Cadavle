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

const shape = ["Flat", "Long", "Short", "Sesamoid", "Irregular"];
const directions = ["Lateral", "Medial", "Superior", "Inferior", "Anterior", "Posterior", "Distal", "Proximal"];

/*
-- directional coordinates --
Starting from the floor, we go upwards in the z, coronal plane is parallel with x-axis, sagital plane is parallel with y-axis

*/

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
      direction = dy > 0 ? "Inferior" : dy < 0 ? "Superior" : "Same";
    }
  } else {
    direction = dz > 0 ? "Posterior" : dz < 0 ? "Anterior" : "Same";
  }

  return direction;
}

const bones = [
    //new Bone("Femur", shape[1], {x: 1, y: 2, z: 1}, 45.72, 3, true),
    //new Bone("Scapula", shape[0], {x: 1, y: 1, z: 1}, 15.00, 2, false),
    //new Bone("Patella", shape[3], {x: 0, y: 0, z: 2}, 4.45, 2, true),

    new Bone("Femur", "Long", {x: 0, y: 4, z: 0}, 45.72, 2, true),
    new Bone("Patella", "Sesamoid", {x: 0, y: 3.5, z: 0}, 4.5, 0, true),
    new Bone("Tibia", "Long", {x: 0.5, y: 2.5, z: 0}, 40.0, 2, true),
    new Bone("Fibula", "Long", {x: -0.5, y: 2.5, z: 0}, 40.0, 2, true),
    new Bone("Talus", "Short", {x: 0, y: 1, z: 0}, 5.0, 4, true),
    new Bone("Calcaneus", "Irregular", {x: -0.5, y: 1, z: -1}, 5.5, 3, true),
    new Bone("Navicular", "Short", {x: 0.5, y: 1, z: 1}, 4.0, 6, true),
    new Bone("Cuboid", "Short", {x: -0.5, y: 1, z: 1}, 4.0, 5, true),
    new Bone("Medial Cuneiform", "Short", {x: 0.7, y: 0.8, z: 2}, 2.0, 4, true),
    new Bone("Intermediate Cuneiform", "Short", {x: 0.5, y: 0.8, z: 2}, 2.0, 4, true),
    new Bone("Lateral Cuneiform", "Short", {x: 0.3, y: 0.8, z: 2}, 2.0, 6, true),
    new Bone("Metatarsals", "Long", {x: 0.3, y: 0.5, z: 3}, 5.0, 2, true),
    new Bone("Foot Phalanges", "Long", {x: 0.5, y: 0.2, z: 4.5}, 2.5, 2, true),
];

// Random bone to guess
let targetBone = bones[Math.floor(Math.random() * bones.length)];
let guessCount = 0;

// Input and button
const input = document.getElementById("myInput");
const button = document.querySelector("button.buttonf");

button.addEventListener("click", handleGuess);

window.onload = function() {
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

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // If input is not an exact match, autocomplete with the first suggestion
        const userInput = input.value.trim().toLowerCase();
        if (userInput) {
            const firstMatch = bones.find(b => b.name.toLowerCase().startsWith(userInput));
            if (firstMatch && firstMatch.name.toLowerCase() !== userInput) input.value = firstMatch.name;
            else handleGuess();
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

    // Render to a new row (you can improve this with better indexing)
    const row = document.getElementsByClassName("row"); // Replace with dynamic logic
    const cells = row[guessCount * 2].querySelectorAll(".frame");
    row[guessCount * 2 + 1].style.display = "none";
    row[guessCount++ * 2].style.display = "flex";

    cells[0].textContent = guess.name;
    cells[1].textContent = guess.shape;
    cells[2].textContent = getRelativeDirection(guess, targetBone);
    cells[3].textContent = guess.length;
    cells[4].textContent = guess.connects;

    const upColor = "#B042FF"
    const downColor = "#E78F3A";
    const wrongColor = "#c14b2eff";
    const sameColor = "#56c079ff";

    //background logic for shape
    if (guess.shape !== targetBone.shape) cells[1].style.backgroundColor = wrongColor;
    else cells[1].style.backgroundColor = sameColor;

    //background logic for direction
    if (getRelativeDirection(guess, targetBone) !== "Same") cells[2].style.backgroundColor = upColor;
    else cells[2].style.backgroundColor = sameColor;

    //background logic for length
    if (guess.length < targetBone.length) {
        cells[3].style.backgroundColor = upColor;
        cells[3].textContent += " ⬆️";
    }
    else if (guess.length > targetBone.length) {
        cells[3].style.backgroundColor = downColor;
                cells[3].textContent += " ⬇️";
     }
    else cells[3].style.backgroundColor = sameColor;

    //backround logic for other bones touching
    if (guess.connects < targetBone.connects) {
        cells[4].style.backgroundColor = upColor;
        cells[4].textContent += " ⬆️";
    }
    else if (guess.connects > targetBone.connects) {
        cells[4].style.backgroundColor = downColor;
                cells[3].textContent += " ⬇️";
     }
    else cells[4].style.backgroundColor = sameColor;

    //win condition
    if (guess.name === targetBone.name) {
        answer.textContent = `Congratulations! You found the ${targetBone.name} in ${guessCount} guesses!`;
        button.disabled = true; // Disable button after correct guess
    }
}