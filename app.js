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

  const range = 0.2;
  let direction = "";

  // Compare absolute values to find strongest axis of difference
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const absDz = Math.abs(dz);

  if (absDx >= absDy && absDx >= absDz) {
    direction = dx > range ? "Lateral" : dx < -range ? "Medial" : "Same";
  } else if (absDy >= absDx && absDy >= absDz) {
    if (guess.appendicular) {
      direction = dy > range ? "Distal" : dy < -range ? "Proximal" : "Same";
    } else {
      direction = dy > range ? "Superior" : dy < -range ? "Inferior" : "Same";
    }
  } else {
    direction = dz > range ? "Anterior" : dz < -range ? "Posterior" : "Same";
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
    new Bone("Talus", "Short", {x: 0, y: 1, z: 0}, 5.0, 1, true),
    new Bone("Calcaneus", "Irregular", {x: -0.5, y: 1, z: -1}, 5.5, 1, true),
    new Bone("Navicular", "Short", {x: 0.5, y: 1, z: 1}, 4.0, 1, true),
    new Bone("Cuboid", "Short", {x: -0.5, y: 1, z: 1}, 4.0, 1, true),
    new Bone("Medial Cuneiform", "Short", {x: 0.7, y: 0.8, z: 2}, 2.0, 1, true),
    new Bone("Intermediate Cuneiform", "Short", {x: 0.5, y: 0.8, z: 2}, 2.0, 1, true),
    new Bone("Lateral Cuneiform", "Short", {x: 0.3, y: 0.8, z: 2}, 2.0, 1, true),
    new Bone("Metatarsal 1", "Long", {x: 0.7, y: 0.5, z: 3}, 5.0, 1, true),
    new Bone("Metatarsal 2", "Long", {x: 0.5, y: 0.5, z: 3}, 5.0, 1, true),
    new Bone("Metatarsal 3", "Long", {x: 0.3, y: 0.5, z: 3}, 5.0, 1, true),
    new Bone("Metatarsal 4", "Long", {x: 0.1, y: 0.5, z: 3}, 5.0, 1, true),
    new Bone("Metatarsal 5", "Long", {x: -0.1, y: 0.5, z: 3}, 5.0, 1, true),
    new Bone("Proximal Phalanx 1", "Long", {x: 0.7, y: 0.3, z: 4}, 3.0, 1, true),
    new Bone("Middle Phalanx 2", "Long", {x: 0.5, y: 0.2, z: 4.5}, 2.5, 1, true),
    new Bone("Distal Phalanx 1", "Long", {x: 0.7, y: 0.1, z: 5}, 2.0, 1, true),
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

const answer = document.getElementsByClassName("answer");
answer.textContent = targetBone.name + " is the bone you are looking for!";

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
}