export default class Ball {
  constructor(canvas, ctx, ballPos, velocity, gameData){
    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
    this.gameData = gameData;
    this.ballRadius = 20;
    this.dead = false;
    this.paddleHit = new Audio();
    this.paddleHit.src = "assets/paddlehit.wav";
    this.ballPic = new Image();
    this.ballPic.src = 'assets/ball.png'
  }

  drawBall(){
    this.ctx.beginPath();
    this.ctx.fillStyle = '#fd01fd';
    this.ctx.strokeStyle = '3px #50F3FD';
    this.ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false );
    this.ctx.stroke();
    this.ctx.fill();
    // this.ctx.drawImage(this.ballPic, this.ballPos[0], this.ballPos[1], this.ballRadius * 2, this.ballRadius * 2);
  }

  updateBall(paddle, lives, balls, gameData){
    if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if ( this.ballPos[1] - this.ballRadius < 0 ) {
      this.velocity[1] = -this.velocity[1];
    } else if ( this.ballPos[1] + this.ballRadius >= 720 - paddle.paddleHeight ) {
      this.paddleHit.play();
      this.paddleReflector(balls, gameData, paddle)
      }
    this.ballPos[0] += this.velocity[0];
    this.ballPos[1] += this.velocity[1];
  }

  paddleReflector(balls, gameData, paddle) {
    const paddleSectorOne = paddle.paddleX + (paddle.paddleWidth / 4)
    const paddleSectorTwo = paddle.paddleX + (paddle.paddleWidth / 2)
    const paddleSectorThree = paddle.paddleX + ((paddle.paddleWidth / 2) + (paddle.paddleWidth / 4))
    const paddleSectorFour = paddle.paddleX + paddle.paddleWidth

    if (this.ballPos[0] + this.ballRadius >= paddleSectorThree && this.ballPos[0] - this.ballRadius < paddleSectorFour ) {
      // console.log('right hit');
        this.velocity = [5, -5];
    } else if (this.ballPos[0] + this.ballRadius >= paddle.paddleX && this.ballPos[0] - this.ballRadius < paddleSectorOne ) {
      // console.log('left hit');
      this.velocity = [-5, -5];

    } else if (this.ballPos[0] + this.ballRadius >= paddleSectorTwo && this.ballPos[0] - this.ballRadius < paddleSectorThree ) {
      // console.log('right mid hit');
      this.velocity = [1, -7];
    } else if (this.ballPos[0] + this.ballRadius >= paddleSectorOne && this.ballPos[0] - this.ballRadius <= paddleSectorTwo ) {
      // console.log('left mid hit');
      this.velocity = [-1, -7];

    } else {
      if (balls.length > 1) {
        this.dead = true;
        gameData.lives--;
      } else {
        gameData.lives--;
        this.ballPos = [this.canvas.width / 2, 600];
        this.velocity = [-5, -5];
        paddle.paddleX = (this.canvas.width - paddle.paddleWidth)/2;
        this.gameData.stopped = true;
      }
    }
  }
}
