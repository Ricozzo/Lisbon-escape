let backgroundMusic = new Audio("../audio/garagem.mp3");
backgroundMusic.loop = false;

class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemyOne = [];
    this.enemyTwo = [];
    this.enemyThree = [];
    this.enemyFour = [];
    this.score = 0;
    this.highScore = 0;
    this.lives = 3;
    this.maleScream = new Audio("../audio/male.mp3");
    this.maleScream.loop = false;
    this.femaleScream = new Audio("../audio/female.mp3");
    this.femaleScream.loop = false;
    this.pigeonScream = new Audio("../audio/pigeon.mp3");
    this.pigeonScream.loop = false;
    this.bikeScream = new Audio("../audio/bike.mp3");
    this.bikeScream.loop = false;
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
    backgroundMusic.play();
  }

  update = () => {
    this.frames++;
    this.clear();
    this.createBackground();
    this.player.jump();
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.checkGameOver();
    this.drawScore();
  };

  // Clear Background
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  createBackground() {
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
    });

    img.src = "../images/background2.jpg";
    this.ctx.drawImage(img, 0, 0, this.width, this.height);
  }

  //Stop game
  stop() {
    clearInterval(this.intervalId);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  //Clears Canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  //Update Enemies
  updateEnemies() {
    for (let i = 0; i < this.enemyOne.length; i++) {
      this.enemyOne[i].x -= 3; // Enemy goes more to the right
      this.enemyOne[i].draw(); // continue to draw enemy

      if (this.enemyOne[i].x < 0) {
        this.score++;
        this.enemyOne.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyTwo.length; i++) {
      this.enemyTwo[i].x -= 3; // Enemy goes more to the right
      this.enemyTwo[i].draw(); // continue to draw enemy

      if (this.enemyTwo[i].x < 0) {
        this.score++;
        this.enemyTwo.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyThree.length; i++) {
      this.enemyThree[i].x -= 3; // Enemy goes more to the right
      this.enemyThree[i].draw(); // continue to draw enemy

      if (this.enemyThree[i].x < 0) {
        this.score++;
        this.enemyThree.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyFour.length; i++) {
      this.enemyFour[i].x -= 3; // Enemy goes more to the right
      this.enemyFour[i].draw(); // continue to draw enemy

      if (this.enemyFour[i].x < 0) {
        this.score++;
        this.enemyFour.splice(i, 1);
      }
    }

    // each 2 seconds, a enemy is updated
    if (this.frames % 200 === 0) {
      let randomNumber = Math.floor(Math.random() * 4);
      if (randomNumber === 0) {
        this.enemyOne.push(
          new Component(1400, 500, 40, 80, "enemy1", this.ctx)
        );
      } else if (randomNumber === 1) {
        this.enemyTwo.push(
          new Component(1400, 500, 40, 80, "enemy2", this.ctx)
        );
      } else if (randomNumber === 2) {
        this.enemyThree.push(
          new Component(1400, 500, 80, 80, "enemy3", this.ctx)
        );
      } else if (randomNumber === 3) {
        this.enemyFour.push(
          new Component(1400, 140, 60, 60, "enemy4", this.ctx)
        );
      }
      //Component(x: any, y: any, w: any, h: any, img: any, ctx: any):
    }
  }

  drawScore() {
    const hearts = new Image();
    hearts.src = "../images/heart.png";
    if (this.lives === 3) {
      this.ctx.drawImage(hearts, 1350, 20, 40, 40);
      this.ctx.drawImage(hearts, 1310, 20, 40, 40);
      this.ctx.drawImage(hearts, 1270, 20, 40, 40);
    } else if (this.lives === 2) {
      this.ctx.drawImage(hearts, 1310, 20, 40, 40);
      this.ctx.drawImage(hearts, 1270, 20, 40, 40);
    } else if (this.lives === 1) {
      this.ctx.drawImage(hearts, 1270, 20, 40, 40);
    }

    const passport = new Image();
    passport.src = "../images/passport.png";

    //const sardinLink = 'https://www.linkedin.com/in/elnaz-farrokhi/';
    const sardin = new Image();
    sardin.src = "../images/sardinnn.png";

    const portowine = new Image();
    portowine.src = "../images/portowine.png";

    const restartButton = new Image();
    restartButton.src = "../images/restart.png";

    if (this.lives <= 0) {
      this.stop();
      this.ctx.roundRect(
        this.width / 2 - 250,
        this.height / 2 - 200,
        500,
        400,
        10
      );
      if (this.score > this.highScore){
      this.highScore = this.score;
      };
      this.ctx.fillStyle = "#870007";
      this.ctx.fill();
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px minecraft";
      this.ctx.fillText("You were deported", 575, 245);
      this.ctx.fillText(`score: ${this.score}`, 650, 290);
      this.ctx.fillText(`Grab your Souvenir`, 570, this.height / 2 + 150);
      this.ctx.drawImage(passport, 650, 100, 100, 125);
      this.ctx.drawImage(sardin, 470, 400, 70, 90);
      this.ctx.drawImage(portowine, 858, 400, 75, 90);

      // Restart Button
      this.ctx.drawImage(restartButton, 630, 335, 154, 50);

      // Add event listener for restart button
      const canvasElement = document.querySelector("canvas");
      canvasElement.addEventListener("click", (event) => {
        const canvasX = event.pageX - canvasElement.offsetLeft;
        const canvasY = event.pageY - canvasElement.offsetTop;

        //Restart Button
        if (
          canvasX >= 630 &&
          canvasX <= 784 &&
          canvasY >= 335 &&
          canvasY <= 385
        ) {
          // Restart game
          location.reload();
        }

        //Sardin
        if (
          canvasX >= 470 && //x
          canvasX <= 540 && //x+w
          canvasY >= 400 && //y
          canvasY <= 490 //y+h
        ) {
          // Elnaz LinkedIn
          window.location.href = "https://www.linkedin.com/in/elnaz-farrokhi/";
        }

        //Portowine
        if (
          canvasX >= 858 && //x
          canvasX <= 933 && //x+w
          canvasY >= 400 && //y
          canvasY <= 490 //y+h
        ) {
          // Henrique Linkedin
          window.location.href =
            "https://www.linkedin.com/in/henriqueortizpereira/";
        }
      });
    } else {
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Minecraft";
      this.ctx.fillText(`Score: ${this.score}`, 20, 50);
    }
  }

  drawHighScore() {
   if (this.highScore != 0){
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Minecraft";
    this.ctx.fillText(`High Score: ${this.score}`, 100, 50);
   }
  }

  checkGameOver() {
    /*     const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.lives--;
    } */

    for (let i = 0; i < this.enemyOne.length; i++) {
      if (this.player.crashWith(this.enemyOne[i])) {
        this.femaleScream.play();
        this.lives--;
        this.enemyOne.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyTwo.length; i++) {
      if (this.player.crashWith(this.enemyTwo[i])) {
        this.maleScream.play();
        this.lives--;
        this.enemyTwo.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyThree.length; i++) {
      if (this.player.crashWith(this.enemyThree[i])) {
        this.bikeScream.play();
        this.lives--;
        this.enemyThree.splice(i, 1);
      }
    }
    for (let i = 0; i < this.enemyFour.length; i++) {
      if (this.player.crashWith(this.enemyFour[i])) {
        this.pigeonScream.play();
        this.lives--;
        this.enemyFour.splice(i, 1);
      }
    }
  }
}
