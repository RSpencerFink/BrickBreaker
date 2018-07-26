const Ball = require('./ball');

class Game {
  constructor(){
    this.ball = new Ball({pos: [50, 50]});
  }

  drawElements(ctx){
    this.ball.drawBall(ctx);
    this.ball.updateBall();
    requestAnimationFrame(drawElements);
  }

}

module.export = Game;
