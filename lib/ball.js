export default class Ball {
  constructor(){
    this.ballPos = [50, 50];
    this.velocity = [4, 4];
    this.ballRadius = 20;
  }

  drawBall(){
    ctx.beginPath();
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'blue'
    ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false );
    ctx.stroke();
    ctx.fill();
  }

  updateBall(){
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
}
