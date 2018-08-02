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
    this.gameData = { score: 0, lives: 3, paused: false, started: 0, highScore: 0, stopped: false };
    this.ballHandler = new BallHandler(canvas, ctx, this.gameData);
    this.paddle = new Paddle(canvas, ctx);
    this.levels = [ new BrickGrid(canvas, ctx, 0, 0, this.gameData), new BrickGrid(canvas, ctx, 10, 2, this.gameData), new BrickGrid(canvas, ctx, 10, 3, this.gameData), new BrickGrid(canvas, ctx, 10, 4, this.gameData)]
    this.brickGrid = this.levels[0]
    // this.brickGrid.buildGrid();
    this.animate = this.animate.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  togglePause(e){
    if(e.keyCode == 32) {
      if (this.gameData.started && !this.gameData.stopped){
        this.gameData.paused = !this.gameData.paused;
        if (!this.gameData.paused) {
          this.animate();
        }
      }
      if (this.gameData.stopped){
        this.gameData.stopped = !this.gameData.stopped;
        this.animate();
      }
    }
  }

  startGame(e){
    if(e.keyCode == 13) {
      if (!this.gameData.started || this.brickGrid.won){
        this.gameData.started = true;
        this.levels.shift();
        this.brickGrid = this.levels[0]
        if (this.gameData.started > -1){
          this.brickGrid.buildGrid();
          this.animate();
        }
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
      if (this.gameData.stopped) {
        this.music.pause();
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "36px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("CONTINUE", 560, 360);
        this.ctx.font = "24px ArcadeClassic";
        this.ctx.fillText("Press  Spacebar", 550, 420);
        return;
      }
       if (!this.gameData.lives){
        this.gameOver.play();
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("GAME OVER", 480, 360);
        return;
      }
      if (this.brickGrid.won && this.levels.length === 1){
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("YOU  WIN", 500, 360);
        this.ctx.font = "72px ArcadeClassic";
        return;
      }
      if (this.brickGrid.won && this.levels.length > 1){
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0,0,1280,720);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("YOU  WIN", 500, 360);
        this.ctx.font = "72px ArcadeClassic";
        this.ctx.fillText("Press Enter to Continue", 400, 360);
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
