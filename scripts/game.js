class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
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
      this.enemies[i].x -= 1; // Enemy goes more to the right
      this.enemies[i].draw(); // continue to draw enemy
    }

    if (this.frames % 200 === 0) {
      let randomNumber = 0;
      let x = 1200
      
      let minWeight = -100; // at least 20px of min height
      let maxWeight = -100; // max height

      let weight = Math.floor(Math.random() * (maxWeight - minWeight + 1) + minWeight);

      let minGap = 475;
      let maxGap = 475;

      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      //Top obstacle EXTRA
      //this.enemies.push(new Component(x, 0, 50, height, "green", this.ctx));
        randomNumber = Math.floor(Math.random() * 3);
      //Bottom obstacle

        // if counter is 0
        if (randomNumber === 1) {
          this.enemies.push(new Enemy1(x, 480, 50, 100, "enemy1", this.ctx));
        } else if (randomNumber === 2) {
          this.enemies.push(new Enemy2(x, 480, 50, 100, "enemy2", this.ctx));
        } else if (randomNumber === 3) {
          this.enemies.push(new Enemy3(x, 480, 50, 100, "enemy3", this.ctx));
      };
          //Component(x: any, y: any, w: any, h: any, img: any, ctx: any):
    }
  }

  checkGameOver() {
    const crashed = this.enemies.some((enemy) => {
      return this.player.crashWith(enemy);
    });

    if (crashed) {
      this.stop();
      this.fillStyle = "orange";
      this.ctx.font = "72px Arial";
      this.ctx.fillText("You were deported", 0, this.height / 2);
    }
  }
}