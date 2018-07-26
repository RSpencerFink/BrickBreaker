import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';
import BrickGrid from './brick_grid';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas, ctx);
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


const animate = () => {
  if (!paused) {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, 1280, 720)
    brickGrid.drawBricks();
    ball.drawBall();
    ball.updateBall(paddle);
    paddle.drawPaddle();
    paddle.updatePaddle();
    brickGrid.collisionDetection(ball);
    brickGrid.drawScore();
  } else {
    return;
  }
};
document.addEventListener('keydown', togglePause);
document.addEventListener("keydown", () => paddle.keyDownHandler(event), false);
document.addEventListener("keyup", () => paddle.keyUpHandler(event), false);
animate();
