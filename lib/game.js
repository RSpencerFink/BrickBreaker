import Ball from './ball';
import Paddle from './paddle';
import Brick from './brick';
import BrickGrid from './brick_grid';
import PowerUp from './power_up';
import BallHandler from './ball_handler';

export default class Game {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.music = new Audio();
    this.music.src = "assets/RetroWave.mp3";
    this.music.loop = true;
    this.gameOver = new Audio();
    this.gameOver.src = "assets/gameover.wav";
    this.gameData = { score: 0, lives: 3, paused: false, started: false };
    this.ballHandler = new BallHandler(canvas, ctx);
    this.paddle = new Paddle(canvas, ctx);
    this.brickGrid = new BrickGrid(canvas, ctx, 10, 2);
    this.brickGrid.buildGrid();
    this.animate = this.animate.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  togglePause(e){
    if(e.keyCode == 32) {
      if (this.gameData.started){
        this.gameData.paused = !this.gameData.paused;
        if (!this.gameData.paused) {
          this.animate();
        }
      }
    }
  }

  startGame(e){
    if(e.keyCode == 13) {
      if (!this.gameData.started){
        this.gameData.started = true;
        this.animate();
      }
    }
  }

  drawLives() {
    this.ctx.font = "24px ArcadeClassic";
    this.ctx.fillStyle = "pink";
    this.ctx.fillText("Lives: " + this.gameData.lives, this.canvas.width - 100, 710);
  }

  drawScore () {
    this.ctx.font = "24px ArcadeClassic";
    this.ctx.fillStyle = 'pink';
    this.ctx.fillText("Score: "+ this.gameData.score, 12, 710);
  }

  animate () {
    if (!this.gameData.started) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0,0,1280,720);
      this.ctx.font = "36px ArcadeClassic";
      this.ctx.fillStyle = 'pink';
      this.ctx.fillText("PRESS  ENTER  TO  START", 460, 360);
      return;
    }
    if (!this.gameData.paused) {
       if (!this.gameData.lives){
        this.gameOver.play();
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("GAME OVER", 480, 360);
        return;
      }
      if (this.brickGrid.won){
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("YOU  WIN", 500, 360);
        return;
      }
      requestAnimationFrame(this.animate);
      this.music.play();
      this.ctx.clearRect(0, 0, 1280, 720)
      this.ballHandler.drawBalls();
      this.ballHandler.updateBalls(this.paddle, this.gameData);
      this.brickGrid.drawBricks(this.paddle, this.ballHandler, this.gameData);
      this.brickGrid.collisionDetection(this.ballHandler, this.gameData);
      this.paddle.drawPaddle();
      this.paddle.updatePaddle();
      this.drawLives();
      this.drawScore();
    } else if (this.gameData.paused) {
      this.music.pause();
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0,0,1280,720);
      this.ctx.font = "36px ArcadeClassic";
      this.ctx.fillStyle = 'pink';
      this.ctx.fillText("PAUSED", 580, 360);
      this.ctx.font = "24px ArcadeClassic";
      this.ctx.fillText("Press  Spacebar  to  Resume", 490, 420);
      return;
    }
  }
}
