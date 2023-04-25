class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.score = 0;
    this.lives = 3;
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
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

  //Stops game
  stop() {
    clearInterval(this.intervalId);
  }

  //Clears Canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  //Update Enemies
  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x -= 3; // Enemy goes more to the right
      this.enemies[i].draw(); // continue to draw enemy

      if (this.enemies[i].x < 0) {
        this.score++;
        this.enemies.splice(i, 1);
      }
    }

    // each 2 seconds, a enemy is updated
    if (this.frames % 300 === 0) {
      /*
      let minWidth = 50; // at least of 50px of width
      let maxWidth = 400; // max width of 400px
      let width = Math.floor(Math.random()*(maxWidth - minWidth + 1) + minWidth);
      let randomX = Math.floor(Math.random() * (this.ctx.canvas.width - width));
      */

      let randomNumber = Math.floor(Math.random() * 4);
      if (randomNumber === 0) {
        this.enemies.push(new Component(1400, 500, 40, 80, "enemy1", this.ctx));
      } else if (randomNumber === 1) {
        this.enemies.push(new Component(1400, 500, 40, 80, "enemy2", this.ctx));
      } else if (randomNumber === 2) {
        this.enemies.push(new Component(1400, 500, 80, 80, "enemy3", this.ctx));
      } else if (randomNumber === 3) {
        this.enemies.push(new Component(1400, 100, 60, 60, "enemy4", this.ctx));
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
    const sardin = new Image();
    sardin.src = "../images/sardinha.png";
    const portowine = new Image();
    portowine.src = "../images/portowine.png";
    if (this.lives <= 0) {
      this.stop();
      this.ctx.roundRect(this.width / 2 - 200, this.height / 2 - 200, 400, 400, 10);
      this.ctx.fillStyle = "#870007";
      this.ctx.fill();
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Arial";
      this.ctx.fillText("You were deported", 575, this.height / 2);
      this.ctx.fillText(`score: ${this.score}`, 650, this.height / 2 + 60);
      this.ctx.drawImage(passport, 650, 150, 100, 125);
      this.ctx.drawImage(sardin, 490, 375, 175, 130);
      this.ctx.drawImage(portowine, 800, 400, 75, 90);
    } else {
      this.ctx.fillStyle = "white";
      this.ctx.font = "15px Arial";
      this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }
  }

  checkGameOver() {
    /*     const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.lives--;
    } */

    for (let i = 0; i < this.enemies.length; i++) {
      if (this.player.crashWith(this.enemies[i])) {
        this.lives--;
        this.enemies.splice(i, 1);
      }
    }
  }
}
