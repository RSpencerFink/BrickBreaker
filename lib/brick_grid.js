import Brick from './brick';

export default class BrickGrid {
  constructor(canvas, ctx, rows, cols){
    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.score = 0;
    this.won = false;
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

  drawBricks(paddle, balls, lives) {
    for (var i = 0; i < balls.length; i++) {
      let ball = balls[i]
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
            this.ctx.fillStyle = "purple";
            this.ctx.strokeStyle = 'blue'
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.closePath();
          }
          if (this.bricks[c][r].powerUp){
            this.bricks[c][r].powerUp.drawPowerUp(paddle, ball, lives);
          }
        }
      }
    }
  }

  collisionDetection(balls) {
    for (var i = 0; i < balls.length; i++) {
      let ball = balls[i]
      for(var c = 0; c < this.rows; c++) {
        for(var r = 0; r < this.cols; r++) {
          var brick = this.bricks[c][r];
          if(brick.status == 1) {
            if(ball.ballPos[0] > brick.brickPos[0] && ball.ballPos[0] < brick.brickPos[0] + brick.brickWidth && ball.ballPos[1] > brick.brickPos[1] && ball.ballPos[1] < brick.brickPos[1] + brick.brickHeight) {
              ball.velocity[1] = -ball.velocity[1];
              brick.status = 0;
              this.score ++;
              if (brick.powerUp){
                brick.powerUp.status = 1;
                brick.powerUp.velocity = [0, 2]
              }
              if (this.score == this.rows * this.cols){
                this.won = true;
              }
            }
          }
        }
      }
    }
  }

  drawScore () {
    this.ctx.font = "24px Lazer84";
    this.ctx.fillStyle = 'pink';
    this.ctx.fillText("Score: "+this.score, 12, 710);
  }


}
