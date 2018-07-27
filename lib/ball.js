export default class Ball {
  constructor(canvas, ctx, ballPos, velocity){
    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
    this.ballRadius = 20;
    this.dead = false;
  }

  drawBall(){
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fd01fd';
    this.ctx.strokeStyle = '3px #50F3FD';
    this.ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false );
    this.ctx.stroke();
    this.ctx.fill();
  }

  updateBall(paddle, lives, balls){
    if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if ( this.ballPos[1] - this.ballRadius < 0 ) {
      this.velocity[1] = -this.velocity[1];
    } else if ( this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight ) {
      if (this.ballPos[0] > paddle.paddleX + (paddle.paddleWidth / 2) && this.ballPos[0] < paddle.paddleX + paddle.paddleWidth ) {
        console.log('right hit');
        if (this.velocity[0] < 0) {
          this.velocity[0] = -this.velocity[0]
        }
        this.velocity[1] = -this.velocity[1];
      }
      else if (this.ballPos[0] > paddle.paddleX && this.ballPos[0] < paddle.paddleX + (paddle.paddleWidth / 2) ){
        if (this.velocity[0] > 0) {
          this.velocity[0] = -this.velocity[0]
        }
        console.log('left hit');
        this.velocity[1] = -this.velocity[1];
      } else {
        if (balls.length > 1) {
          this.dead = true;
          lives.lives--;
        } else {
          lives.lives--;
          this.ballPos = [this.canvas.width / 2, 600];
          this.velocity = [-5, -5];
          paddle.paddleX = (this.canvas.width - paddle.paddleWidth)/2;
        }
      }
    }
    this.ballPos[0] += this.velocity[0];
    this.ballPos[1] += this.velocity[1];
  }
}
