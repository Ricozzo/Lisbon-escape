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
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
  }

  update = () => {
    this.frames++;
    this.clear();
    this.createBackground();
    this.player.jump()
    this.player.newPos();
    this.player.draw();
    this.updateEnemies();
    this.checkGameOver();
    this.drawScore();
  }

    // Clear Background
    clear(){
      this.ctx.clearRect(0,0,this.width, this.height);
  }

  createBackground(){
      const img = new Image();
      img.addEventListener('load', ()=>{
          this.img = img;
      });

      img.src= "../images/background.png";
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
    }

    // each 2 seconds, a enemy is updated
    if (this.frames % 300 === 0) {

      /*
      let minWidth = 50; // at least of 50px of width
      let maxWidth = 400; // max width of 400px
      let width = Math.floor(Math.random()*(maxWidth - minWidth + 1) + minWidth);
      let randomX = Math.floor(Math.random() * (this.ctx.canvas.width - width));
      */

        let randomNumber = Math.floor(Math.random() * 3);
        if (randomNumber === 0) {
          this.enemies.push(new Component(1200, 500, 40, 80, "enemy1", this.ctx));
        } else if (randomNumber === 1) {
          this.enemies.push(new Component(1400, 500, 40, 80, "enemy2", this.ctx));
        } else if (randomNumber === 2) {
          this.enemies.push(new Component(1000, 500, 50, 80, "enemy3", this.ctx));
      };
          //Component(x: any, y: any, w: any, h: any, img: any, ctx: any):
    };  


    if (this.enemies[i].x > this.width) {
      this.score++;
      this.enemies.splice(i,2);
    }
    
  }

    drawScore() {
      this.ctx.fillStyle = "white";
      this.ctx.font = "24px Arial";
      this.ctx.fillText(`score: ${this.score}, 10, 30`);
    }


  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    let lives = 3;

    if (crashed) {
      lives--;
    } else {
      this.stop();
      this.fillStyle = "orange";
      this.ctx.font = "72px Arial";
      this.ctx.fillText("You were deported", 0, this.height / 2);
    }
  }
}