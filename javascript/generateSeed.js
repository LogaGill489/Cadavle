import { Bone, bones } from "./boneConstruct.js";

// Populate the bone selector dropdown
const boneSelector = document.getElementById("boneList");
bones.forEach(bone => {
    const option = document.createElement("option");
    option.value = bone.name;
    boneSelector.appendChild(option);
});

// generate a new bone for the daily challenge — returns the chosen Bone
export function dailyBone(sessionDate) {
    // sessionDate expected "YYYY-MM-DD"
    const md = sessionDate.slice(5); // "MM-DD"
    // 04-01 special case
    if (md === "04-01") {
        const funny = new Bone("Funny Bone", "Long", { x: 1.79, y: 6.0, z: 0 }, 72.0, 0, 1, 8);
        bones.push(funny);
        return funny;
    }

    const shuffled = shuffleWithSeed(bones.slice(), sessionDate);
    return shuffled[0];  // deterministic per sessionDate
}

// seeded shuffle function (Fisher-Yates)
function shuffleWithSeed(array, seed) {
    let m = array.length, t, i;

    let seedNum = 0;
    for (let j = 0; j < seed.length; j++) {
        seedNum = (seedNum << 5) - seedNum + seed.charCodeAt(j);
        seedNum |= 0;
    }

    function random() {
        // Simple pseudo-random generator based on seed
        const x = Math.sin(seedNum++) * 10000;
        return x - Math.floor(x);
    }

    while (m) {
        i = Math.floor(random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}