//gets the direction of the guess relative to the target bone
export function getRelativeDirection(guess, target) {
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

// Function to end the game and display results
export function endGame( gameState, targetBone, row ) {
    row[13].style.display = "none";
    row[14].style.display = "flex";

    if (gameState === 0) {
        const resetButton = row[14].querySelector(".endless-repeat");
        resetButton.style.display = "none"; // Hide the reset button in daily mode
    }

    const winFrame = row[14].querySelector(".winframe");
    winFrame.textContent = `Bone: ${targetBone.name}`;

    const wikiDiv = row[14].querySelector(".wikipedia");
    let wikiName = targetBone.name.replace(/ /g, "_").toLowerCase();
    switch (Number(targetBone.wikiGroup)) {
        case 1:
            wikiName += "_(bone)";
            break;
        case 2:
            wikiName += "_bones";
            break;
        case 3:
            wikiName += "_bone";
            break;
        case 4:
            wikiName = "Phalanx_bone";
            break;
        case 5:
            wikiName = "Sternum";
            break;
        case 6:
            wikiName = "Rib_cage";
            break;
        case 7:
            wikiName = "Cuneiform_bones";
            break;
        case 8:
             wikiName = "Ulnar_nerve";
            break;
        default:
            // leave wikiName as is
            break;
    }
    wikiDiv.innerHTML = `<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(wikiName)}" target="_blank">
    <img src="resources/wikipediaLogo.png" alt="Wikipedia Logo" title="Learn More About This Bone!" style="width:40px; height:40px; display:block; margin:auto;">
    </a>`;
}

export function saveGuess(boneName, sessionDate) {
    // Get existing guesses for today (or create an empty array)
    const existing = JSON.parse(localStorage.getItem(sessionDate)) || [];
    // Add the new guess
    existing.push(boneName);
    // Save it back
    localStorage.setItem(sessionDate, JSON.stringify(existing));
}