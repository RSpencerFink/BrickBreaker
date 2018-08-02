import Ball from './ball';

export default class BallHandler {
  constructor (canvas, ctx, gameData){
    this.canvas = canvas;
    this.ctx = ctx;
    this.gameData = gameData;
    this.balls = [new Ball(canvas, ctx, [canvas.width / 2, 600], [-5, -5], this.gameData)];
  }

  drawBalls(){
    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].drawBall();
    }
  }

  updateBalls(paddle, lives){
    for (var i = 0; i < this.balls.length; i++) {
      if (this.balls[i].dead){
        this.balls.splice(i,1)
      } else {
        this.balls[i].updateBall(paddle, lives, this.balls, this.gameData)
      }
    }
  }

  addBall(pos, vel){
    this.balls.push(new Ball(this.canvas, this.ctx, pos, vel, this.gameData));
  }
}
