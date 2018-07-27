import Ball from './ball';

export default class PowerUp {
  constructor(canvas, ctx, pos){
    this.canvas = canvas;
    this.ctx = ctx;
    this.powerUpPos = pos;
    this.velocity = [0, 0];
    this.powerUpRadius = 10;
    this.status = 0;
    this.type = this.assignPowerUp();
  }

  drawPowerUp(paddle, ballHandler, lives){
    if (this.status > 0){
      this.ctx.beginPath();
      if (this.type === 1){
        this.ctx.fillStyle = 'green';
      }
      if (this.type === 2){
        this.ctx.fillStyle = 'red';
      }
      if (this.type === 3){
        this.ctx.fillStyle = 'blue';
      }
      this.ctx.strokeStyle = 'blue'
      this.ctx.arc(this.powerUpPos[0], this.powerUpPos[1], this.powerUpRadius, 0, Math.PI * 2, false );
      this.ctx.stroke();
      this.ctx.fill();
      this.updatePowerUp(paddle, ballHandler, lives);
    }
  }

  updatePowerUp(paddle, ballHandler, lives){
    const ballLength = ballHandler.balls.length;
    for (var i = 0; i < ballLength; i++) {
        let ball = ballHandler.balls[i];
        if ( this.powerUpPos[1] + this.powerUpRadius === 720 - paddle.paddleHeight ) {
          if (this.powerUpPos[0] > paddle.paddleX && this.powerUpPos[0] < paddle.paddleX + paddle.paddleWidth && this.powerUpPos[1] + this.powerUpRadius === 720 - paddle.paddleHeight) {
            if (this.type === 1){
              this.status = 0;
              lives.lives ++;
            }
            if (this.type === 2){
              this.status = 0;
              paddle.paddleWidth = paddle.paddleWidth * 2;
              setTimeout(() => this.reducePaddleWidth(paddle), 10000);
            }
            if (this.type === 3){
              this.status = 0;
              ballHandler.addBall([paddle.paddleX, 600], [-5, -5]);
              ballHandler.addBall([paddle.paddleX, 600], [5, -5]);
              lives.lives = lives.lives + 2
            }
          }
        }
    }
    this.powerUpPos[0] += this.velocity[0];
    this.powerUpPos[1] += this.velocity[1];
  }

  assignPowerUp(){
    return Math.floor(Math.random() * Math.floor(3)) + 1
  }

  reducePaddleWidth(paddle){
    paddle.paddleWidth = paddle.paddleWidth / 2
  }
}
