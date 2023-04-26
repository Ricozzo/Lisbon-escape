// JS Initialization
console.log("JS is loaded");

// Canvas Initialization
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Music
/* const backgroundMusic = document.getElementById("backgroundMusic"); */

// Start Button
const startButton = document.getElementById("start");

// Create tha Player
const player = new Component(0, 430, 200, 150, "player", ctx);

//Start Button on Click
startButton.onclick = function () {
  console.log("start");
  const game = new Game(ctx, canvas.width, canvas.height, player);
  /* backgroundMusic.play(); */
  game.start();
  document.getElementById("game-intro").style.display = "none";
};
// Move the Player
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      player.speedX -= 1;
      break;
    case "ArrowRight":
      player.speedX += 1;
      break;
    case "ArrowUp":
      player.jumping = true;
      break;
  }
});

// Stop Speed
document.addEventListener("keyup", () => {
  player.speedX = 0;
  player.speedY = 0;
});


