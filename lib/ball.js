export default class Ball {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = [this.canvas.width / 2, 600];
    this.velocity = [-4, -4];
    this.ballRadius = 20;
  }

  drawBall(){
    this.ctx.beginPath();
    this.ctx.fillStyle = 'purple';
    this.ctx.strokeStyle = 'blue'
    this.ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false );
    this.ctx.stroke();
    this.ctx.fill();
  }

  updateBall(paddle){
    if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if ( this.ballPos[1] - this.ballRadius < 0 ) {
      this.velocity[1] = -this.velocity[1];
    } else if ( this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight ) {
      if (this.ballPos[0] > paddle.paddleX && this.ballPos[0] < paddle.paddleX + paddle.paddleWidth && this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight) {
        this.velocity[1] = -this.velocity[1]
      } else {
        alert("GAME OVER");
        document.location.reload();
      }
    }
    this.ballPos[0] += this.velocity[0];
    this.ballPos[1] += this.velocity[1];
  }

  collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
            }
        }
    }
}
}
