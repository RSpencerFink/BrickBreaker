import PowerUp from './power_up'

export default class Brick {
  constructor(canvas, ctx, brickPos, status, powerUp, gameData){
    this.canvas = canvas;
    this.ctx = ctx;
    this.brickPos = brickPos;
    this.status = status;
    this.gameData = gameData;
    this.brickWidth = 128;
    this.brickHeight = 36;
    this.brickPadding = 0;
    this.brickOffsetTop = 0;
    this.brickOffsetLeft = 0;
    this.powerUp = powerUp;
    this.buildPowerUp();
  }

  buildPowerUp(){
    if (this.powerUp > 5){
      this.powerUp = new PowerUp (this.canvas, this.ctx, [this.brickPos[0], this.brickPos[1]], this.gameData);
    } else {
      this.powerUp = 0;
    }
  }
}
