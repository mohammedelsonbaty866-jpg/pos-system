const beepSound = new Audio("assets/sounds/beep.mp3");

function playBeep() {
  beepSound.currentTime = 0;
  beepSound.play().catch(() => {});
}
