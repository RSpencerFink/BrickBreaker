import Ball from './ball';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
const background = new Image();
background.src = "assets/bg.jpg";

background.onload = function(){
    ctx.drawImage(background,0,0);
}


class Paddle {
  constructor(){
    this.paddleHeight = 20;
    this.paddleWidth = 100;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
  }

  drawPaddle() {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = 'purple';
    ctx.strokeStyle = 'blue'
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  updatePaddle(){
    if(this.rightPressed && this.paddleX < canvas.width - this.paddleWidth) {
    this.paddleX += 7;
    }
    else if(this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7;
    }
  }

  keyDownHandler(e) {
    if(e.keyCode == 39) {
      paddle.rightPressed = true;
    }
    else if(e.keyCode == 37) {
      paddle.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 39) {
      paddle.rightPressed = false;
    }
    else if(e.keyCode == 37) {
      paddle.leftPressed = false;
    }
  }
}

class Brick {
  constructor(brickPos){
    this.brickPos = brickPos;
    this.brickWidth = 128;
    this.brickHeight = 36;
    this.brickPadding = 0;
    this.brickOffsetTop = 0;
    this.brickOffsetLeft = 0;
  }
}

const ball = new Ball();
const paddle = new Paddle();
const bricks = [];
for(var c = 0; c < 10; c++) {
    bricks[c] = [];
    for(var r = 0; r < 2; r++) {
        bricks[c][r] = new Brick([0, 0]);
    };
};

function drawBricks() {
    for(var c = 0; c < 10; c++) {
        for(var r = 0; r < 2; r++) {
            var brickX = (c * (bricks[c][r].brickWidth + bricks[c][r].brickPadding)) + bricks[c][r].brickOffsetLeft;
            var brickY = (r * (bricks[c][r].brickHeight + bricks[c][r].brickPadding)) + bricks[c][r].brickOffsetTop;
            bricks[c][r].brickPos[0] = brickX;
            bricks[c][r].brickPos[1] = brickY;
            ctx.beginPath();
            debugger
            ctx.rect(brickX, brickY, bricks[c][r].brickWidth, bricks[c][r].brickHeight);
            ctx.fillStyle = "purple";
            ctx.strokeStyle = 'blue'
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
}

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, 1280, 720)
  drawBricks();
  ball.drawBall();
  ball.updateBall();
  paddle.drawPaddle();
  paddle.updatePaddle();
};

document.addEventListener("keydown", paddle.keyDownHandler, false);
document.addEventListener("keyup", paddle.keyUpHandler, false);
animate();
