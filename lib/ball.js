export default class Ball {
  constructor(canvas, ctx, ballPos, velocity){
    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
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

  updateBall(paddle, lives){
    if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if ( this.ballPos[1] - this.ballRadius < 0 ) {
      this.velocity[1] = -this.velocity[1];
    } else if ( this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight ) {
      if (this.ballPos[0] > paddle.paddleX && this.ballPos[0] < paddle.paddleX + paddle.paddleWidth && this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight) {
        this.velocity[1] = -this.velocity[1]
      } else {
        lives--;
        this.ballPos = [this.canvas.width / 2, 600];
        this.velocity = [-5, -5];
        paddle.paddleX = (this.canvas.width - paddle.paddleWidth)/2;
      }
    }
    this.ballPos[0] += this.velocity[0];
    this.ballPos[1] += this.velocity[1];
  }
}
