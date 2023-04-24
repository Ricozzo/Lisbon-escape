class Component {
  constructor(x, y, w, h, color, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.jumping = false;
    this.jTop = false;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  jump() {
    if (this.jumping) {
      if (!this.jTop) {
        //up
        this.speedY = -4;
        this.speedX = 0.5;
      } else {
        //down
        this.speedY = 4.5;
        this.speedX = 0.5;
      }

      if (this.y <= 260) {
        // how high you will jump
        this.jTop = true;
      }
      if (this.y >= 525 && this.jTop) {
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
