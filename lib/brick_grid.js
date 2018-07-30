import Brick from './brick';

export default class BrickGrid {
  constructor(canvas, ctx, rows, cols){
    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.won = false;
    this.brickHit = new Audio();
    this.brickHit.src = "assets/brickhit.wav";
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  buildGrid(){
    for(var c = 0; c < this.rows; c++) {
      this.bricks[c] = [];
      for(var r = 0; r < this.cols; r++) {
        this.bricks[c][r] = new Brick(this.canvas, this.ctx, [0, 0], 1, this.getRandomInt(10));
      };
    };
  }

  drawBricks(paddle, ballHandler, lives) {
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
            this.ctx.beginPath();
            this.ctx.rect(brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
            if (r % 2 === 0){
              this.ctx.fillStyle = "purple";
              this.ctx.strokeStyle = 'blue'
            } else {
              this.ctx.fillStyle = "Blue";
              this.ctx.strokeStyle = 'purple'
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
      let ball = ballHandler.balls[i]
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
                brick.powerUp.velocity = [0, 2]
              }
              if (gameData.score == this.rows * this.cols){
                this.won = true;
              }
            }
          }
        }
      }
    }
  }
}
