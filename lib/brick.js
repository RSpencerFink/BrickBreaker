

export default class Brick {
  constructor(canvas, ctx, brickPos, status){
    this.canvas = canvas;
    this.ctx = ctx;
    this.brickPos = brickPos;
    this.status = status;
    this.brickWidth = 128;
    this.brickHeight = 36;
    this.brickPadding = 0;
    this.brickOffsetTop = 0;
    this.brickOffsetLeft = 0;
  }
}
