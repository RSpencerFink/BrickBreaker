import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';
import BrickGrid from './brick_grid';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');

let score = 0;
const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const brickGrid = new BrickGrid(canvas, ctx, 10, 2);
brickGrid.buildGrid();

function drawScore () {
  ctx.font = "16px Arial";
  ctx.fillStyle = 'pink'
  ctx.fillText("Score: "+score, 8, 700);
}

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, 1280, 720)
  brickGrid.drawBricks();
  ball.drawBall();
  ball.updateBall(paddle);
  paddle.drawPaddle();
  paddle.updatePaddle();
  brickGrid.collisionDetection(ball);
  drawScore();
};

document.addEventListener("keydown", () => paddle.keyDownHandler(event), false);
document.addEventListener("keyup", () => paddle.keyUpHandler(event), false);
animate();
