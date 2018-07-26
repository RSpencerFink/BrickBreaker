import Brick from './brick';

export default class BrickGrid {
  constructor(canvas, ctx, rows, cols){
    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
  }

  buildGrid(){
    for(var c = 0; c < this.rows; c++) {
      this.bricks[c] = [];
      for(var r = 0; r < this.cols; r++) {
        this.bricks[c][r] = new Brick(this.canvas, this.ctx, [0, 0], 1);
      };
    };
  }
  drawBricks() {
    for(var c = 0; c < this.rows; c++) {
      for(var r = 0; r < this.cols; r++) {
        if (this.bricks[c][r].status > 0) {
          var brickX = (c * (this.bricks[c][r].brickWidth + this.bricks[c][r].brickPadding)) + this.bricks[c][r].brickOffsetLeft;
          var brickY = (r * (this.bricks[c][r].brickHeight + this.bricks[c][r].brickPadding)) + this.bricks[c][r].brickOffsetTop;
          this.bricks[c][r].brickPos[0] = brickX;
          this.bricks[c][r].brickPos[1] = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
          this.ctx.fillStyle = "purple";
          this.ctx.strokeStyle = 'blue'
          this.ctx.stroke();
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  collisionDetection(ball) {
    for(var c = 0; c < this.rows; c++) {
      for(var r = 0; r < this.cols; r++) {
        var brick = this.bricks[c][r];
        if(brick.status == 1) {
          if(ball.ballPos[0] > brick.brickPos[0] && ball.ballPos[0] < brick.brickPos[0]+ brick.brickWidth && ball.ballPos[1] > brick.brickPos[1] && ball.ballPos[1] < brick.brickPos[1] + brick.brickHeight) {
            ball.velocity[1] = -ball.velocity[1];
            brick.status = 0;
            score ++;
          }
        }
      }
    }
  }

}
