import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';
import BrickGrid from './brick_grid';
import PowerUp from './power_up';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');

let lives = 3;
const balls = [new Ball(canvas, ctx, [canvas.width / 2, 600], [-5, -5])];
const paddle = new Paddle(canvas, ctx);
const brickGrid = new BrickGrid(canvas, ctx, 10, 2);
brickGrid.buildGrid();
let paused = false;


function togglePause(e){
  if(e.keyCode == 32) {
    paused = !paused;
    if (!paused) {
      animate();
    }
  }
}

function drawLives() {
  ctx.font = "24px Lazer84";
  ctx.fillStyle = "pink";
  ctx.fillText("Lives: " + lives, canvas.width - 100, 710);
}


const animate = () => {
  if (!paused) {
     if (!lives){
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,1280,720);
      ctx.font = "36px Lazer84";
      ctx.fillStyle = 'pink';
      ctx.fillText("GAME OVER", 530, 360);
      return;
    }
    if (brickGrid.won){
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,1280,720);
      ctx.font = "36px Lazer84";
      ctx.fillStyle = 'pink';
      ctx.fillText("YOU WIN", 530, 360);
      return;
    }
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, 1280, 720)
    for (var i = 0; i < balls.length; i++) {
      balls[i].drawBall();
      balls[i].updateBall(paddle, lives);
    }
    brickGrid.drawBricks(paddle, balls, lives);
    brickGrid.collisionDetection(balls);
    paddle.drawPaddle();
    paddle.updatePaddle();
    brickGrid.drawScore();
    drawLives();
  } else if (paused) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,1280,720);
    ctx.font = "36px Lazer84";
    ctx.fillStyle = 'pink';
    ctx.fillText("PAUSED", 580, 360);
    ctx.font = "24px Lazer84";
    ctx.fillText("Press  Spacebar  to  Resume", 480, 420);
    return;
  }
};
document.addEventListener('keydown', togglePause);
document.addEventListener("keydown", () => paddle.keyDownHandler(event), false);
document.addEventListener("keyup", () => paddle.keyUpHandler(event), false);
animate();
