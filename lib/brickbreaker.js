import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';
import BrickGrid from './brick_grid';
import PowerUp from './power_up';
import BallHandler from './ball_handler';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
const music = new Audio("assets/RetroWave.mp3");
music.play()
music.loop = true;

let gameData = {lives: 3, score: 0};
const ballHandler = new BallHandler(canvas, ctx);
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
  ctx.font = "24px ArcadeClassic";
  ctx.fillStyle = "pink";
  ctx.fillText("Lives: " + gameData.lives, canvas.width - 100, 710);
}

function drawScore () {
  ctx.font = "24px ArcadeClassic";
  ctx.fillStyle = 'pink';
  ctx.fillText("Score: "+gameData.score, 12, 710);
}


const animate = () => {
  if (!paused) {
     if (!gameData.lives){
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,1280,720);
      ctx.font = "72px ArcadeClassic";
      ctx.fillStyle = 'pink';
      ctx.fillText("GAME OVER", 480, 360);
      return;
    }
    if (brickGrid.won){
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,1280,720);
      ctx.font = "72px ArcadeClassic";
      ctx.fillStyle = 'pink';
      ctx.fillText("YOU  WIN", 480, 360);
      return;
    }
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, 1280, 720)
    ballHandler.drawBalls();
    ballHandler.updateBalls(paddle, gameData);
    brickGrid.drawBricks(paddle, ballHandler, gameData);
    brickGrid.collisionDetection(ballHandler, gameData);
    paddle.drawPaddle();
    paddle.updatePaddle();
    drawLives();
    drawScore();
  } else if (paused) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,1280,720);
    ctx.font = "36px ArcadeClassic";
    ctx.fillStyle = 'pink';
    ctx.fillText("PAUSED", 580, 360);
    ctx.font = "24px ArcadeClassic";
    ctx.fillText("Press  Spacebar  to  Resume", 480, 420);
    return;
  }
};
document.addEventListener('keydown', togglePause);
document.addEventListener("keydown", () => paddle.keyDownHandler(event), false);
document.addEventListener("keyup", () => paddle.keyUpHandler(event), false);
animate();
