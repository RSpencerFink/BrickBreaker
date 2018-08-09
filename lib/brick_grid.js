import Brick from './brick';

export default class BrickGrid {
  constructor(canvas, ctx, rows, cols, gameData){
    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.gameData = gameData;
    this.won = false;
    this.originalScore = 0;
    this.brickHit = new Audio();
    this.brickHit.src = "assets/brickhit.wav";
    this.redbrick = new Image();
    this.redbrick.src = 'assets/redbrick.png';
    this.bluebrick = new Image();
    this.bluebrick.src = 'assets/bluebrick.png';
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  buildGrid(){
    this.originalScore = this.gameData.score;
    for(var c = 0; c < this.rows; c++) {
      this.bricks[c] = [];
      for(var r = 0; r < this.cols; r++) {
        this.bricks[c][r] = new Brick(this.canvas, this.ctx, [0, 0], 1, this.getRandomInt(10), this.gameData);
      };
    };
  }

  drawBricks(paddle, ballHandler, lives) {
    if (this.gridWon()){
      this.won = true;
    }
    for (var i = 0; i < ballHandler.balls.length; i++) {
      let ball = ballHandler.balls[i];
      for(var c = 0; c < this.rows; c++) {
        for(var r = 0; r < this.cols; r++) {
          if (this.bricks[c][r].status > 0) {
            var brickX = (c * (this.bricks[c][r].brickWidth + this.bricks[c][r].brickPadding)) + this.bricks[c][r].brickOffsetLeft;
            var brickY = (r * (this.bricks[c][r].brickHeight + this.bricks[c][r].brickPadding)) + this.bricks[c][r].brickOffsetTop;
            this.bricks[c][r].brickPos[0] = brickX;
            this.bricks[c][r].brickPos[1] = brickY;
            if (this.bricks[c][r].powerUp){
              this.bricks[c][r].powerUp.powerUpPos[0] = brickX + (this.bricks[c][r].brickWidth / 2);
              this.bricks[c][r].powerUp.powerUpPos[1] = brickY;
            }
            if (r % 2 === 0){
              this.ctx.drawImage(this.redbrick, brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);

            } else {
              this.ctx.drawImage(this.bluebrick, brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
            }
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.closePath();
          }
          if (this.bricks[c][r].powerUp){
            this.bricks[c][r].powerUp.drawPowerUp(paddle, ballHandler, lives);
          }
        }
      }
    }
  }

  collisionDetection(ballHandler, gameData) {
    for (var i = 0; i < ballHandler.balls.length; i++) {
      let ball = ballHandler.balls[i];
      for(var c = 0; c < this.rows; c++) {
        for(var r = 0; r < this.cols; r++) {
          var brick = this.bricks[c][r];
          if(brick.status == 1) {
            if(ball.ballPos[0] + ball.ballRadius > brick.brickPos[0] && ball.ballPos[0] + ball.ballRadius < brick.brickPos[0] + brick.brickWidth && ball.ballPos[1] - ball.ballRadius > brick.brickPos[1] && ball.ballPos[1] - ball.ballRadius < brick.brickPos[1] + brick.brickHeight) {
              ball.velocity[1] = -ball.velocity[1];
              brick.status = 0;
              gameData.score ++;
              this.brickHit.play();
              if (brick.powerUp){
                brick.powerUp.status = 1;
                brick.powerUp.velocity = [0, 2];
              }
            }
          }
        }
      }
    }
  }

  gridWon(){
    for (var c = 0; c < this.rows; c++) {
      for (var r = 0; r < this.cols; r++) {
        if (this.bricks[c][r].status === 1){
          return false;
        }
      }
    }
    return true;
  }
}
