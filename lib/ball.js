const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 10,
  SPEED: 4
};

class Ball {
  constructor(ballOptions){
    this.pos = ballOptions.pos
    this.velocity = DEFAULTS.vel;
    this.radius = DEFAULTS.radius;
    this.color = DEFAULTS.color;
  }

  drawBall(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
    ctx.fill();
  }

  updateBall() {
    if (this.pos[0] + this.radius > 1000 || this.pos[0] - this.radius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if (this.pos[1] + this.radius > 750 || this.pos[1] - this.radius < 0){
      this.velocity[1] = -this.velocity[1];
    }
    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
  }
}

module.exports = Ball;
