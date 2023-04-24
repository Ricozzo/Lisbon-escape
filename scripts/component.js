class Component {
  constructor(x, y, w, h, character, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.character = character;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.jumping = false;
    this.jTop = false;
  }

  draw() {
    const img = new Image();
    img.addEventListener("click", () => {
      this.img = img;
    });
    if (this.character === "player") {
      img.src = "../images/tram.png";
    } else if (this.character === "enemy1") {
      img.src = "../images/tourist-1.png";
    } else if (this.character === "enemy2") {
      img.src = "../images/tourist-2.png";
    } else if (this.character === "enemy3") {
      img.src = "../images/bike.png";
    }
    this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  jump() {
    if (this.jumping) {
      if (!this.jTop) {
        //up
        this.speedY = -5;
        this.speedX = 0;
      } else {
        //down
        this.speedY = 5.5;
        this.speedX = 2;
      }

      if (this.y <= 150) {
        // how high you will jump
        this.jTop = true;
      }
      if (this.y >= 430 && this.jTop) {
        // check if jump cycle ended
        this.jumping = false;
        this.jTop = false;
        this.speedY = 0;
        this.speedX = 0;
      }
    }
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  crashWith(enemy) {
    return (
      this.bottom() > enemy.top() &&
      this.top() < enemy.bottom() &&
      this.right() > enemy.left() &&
      this.left() < enemy.right()
    );
  }
}
