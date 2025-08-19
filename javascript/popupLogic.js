//functions used to show and hide the info popup
export function showPopup() {
    //show the popup
    const popup = document.querySelector(".info-popup");
    popup.style.display = "block";

    //start the video from the start
    const video = popup.querySelector("video");
    video.currentTime = 1; // Reset to start
    video.play();

    // Add fade-in animation
    popup.style.opacity = 0;
    void popup.offsetWidth; // Trigger reflow to restart the animation

    // Now add fade-in and set opacity to 1 for transition
    popup.classList.add("fade-in");
    popup.style.opacity = 1;
}

export function hidePopup() {
    //hide the popup
    const popup = document.querySelector(".info-popup");
    popup.style.display = "none";
    popup.classList.remove("fade-in");

    //pause the video
    const video = popup.querySelector("video");
    video.pause();

    //focus on the input field
    input.focus();
}