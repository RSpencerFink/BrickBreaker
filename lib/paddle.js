export default class Paddle {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.paddleHeight = 20;
    this.paddleWidth = 100;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.paddlePic = new Image();
    this.paddlePic.src = 'assets/paddlePic.png'
  }

  drawPaddle() {
    this.ctx.drawImage(this.paddlePic, this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight)
  }

  updatePaddle(){
    if(this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
    this.paddleX += 7;
    }
    else if(this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7;
    }
  }

  keyDownHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = true;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 39) {
      this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
      this.leftPressed = false;
    }
  }
}
