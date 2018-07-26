const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
var background = new Image();
background.src = "assets/bg.jpg";

background.onload = function(){
    ctx.drawImage(background,0,0);
}

class Ball {
  constructor(){
    this.ballPos = [50, 50];
    this.velocity = [4, 4];
    this.ballRadius = 20;
  }

  drawBall(){
    ctx.clearRect(0, 0, 1280, 720)
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false );
    ctx.fill();
  }

  updateBall(){
    if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0){
      this.velocity[0] = -this.velocity[0];
    }
    if (this.ballPos[1] + this.ballRadius > 720 || this.ballPos[1] - this.ballRadius < 0) {
      this.velocity[1] = -this.velocity[1];
    }
    this.ballPos[0] += this.velocity[0];
    this.ballPos[1] += this.velocity[1];
  }
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
    ctx.fillStyle = 'blue';
    ctx.fill();
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

const ball = new Ball();
const paddle = new Paddle();

const animate = () => {
  requestAnimationFrame(animate)
  ball.drawBall();
  ball.updateBall();
  paddle.drawPaddle();
  paddle.updatePaddle();
};

document.addEventListener("keydown", paddle.keyDownHandler, false);
document.addEventListener("keyup", paddle.keyUpHandler, false);
animate();
