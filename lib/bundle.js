/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/brickbreaker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/ball.js":
/*!*********************!*\
  !*** ./lib/ball.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(canvas, ctx, ballPos, velocity) {
    _classCallCheck(this, Ball);

    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
    this.ballRadius = 20;
    this.dead = false;
    this.paddleHit = new Audio();
    this.paddleHit.src = "assets/paddlehit.wav";
  }

  _createClass(Ball, [{
    key: 'drawBall',
    value: function drawBall() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fd01fd';
      this.ctx.strokeStyle = '3px #50F3FD';
      this.ctx.arc(this.ballPos[0], this.ballPos[1], this.ballRadius, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.fill();
    }
  }, {
    key: 'updateBall',
    value: function updateBall(paddle, lives, balls) {
      if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0) {
        this.velocity[0] = -this.velocity[0];
      }
      if (this.ballPos[1] - this.ballRadius < 0) {
        this.velocity[1] = -this.velocity[1];
      } else if (this.ballPos[1] + this.ballRadius > 720 - paddle.paddleHeight) {
        this.paddleHit.play();
        if (this.ballPos[0] > paddle.paddleX + paddle.paddleWidth / 2 && this.ballPos[0] < paddle.paddleX + paddle.paddleWidth) {
          console.log('right hit');
          if (this.velocity[0] < 0) {
            this.velocity[0] = -this.velocity[0];
          }
          this.velocity[1] = -this.velocity[1];
        } else if (this.ballPos[0] > paddle.paddleX && this.ballPos[0] < paddle.paddleX + paddle.paddleWidth / 2) {
          if (this.velocity[0] > 0) {
            this.velocity[0] = -this.velocity[0];
          }
          console.log('left hit');
          this.velocity[1] = -this.velocity[1];
        } else {
          if (balls.length > 1) {
            this.dead = true;
            lives.lives--;
          } else {
            lives.lives--;
            this.ballPos = [this.canvas.width / 2, 600];
            this.velocity = [-5, -5];
            paddle.paddleX = (this.canvas.width - paddle.paddleWidth) / 2;
          }
        }
      }
      this.ballPos[0] += this.velocity[0];
      this.ballPos[1] += this.velocity[1];
    }
  }]);

  return Ball;
}();

exports.default = Ball;

/***/ }),

/***/ "./lib/ball_handler.js":
/*!*****************************!*\
  !*** ./lib/ball_handler.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ball = __webpack_require__(/*! ./ball */ "./lib/ball.js");

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BallHandler = function () {
  function BallHandler(canvas, ctx) {
    _classCallCheck(this, BallHandler);

    this.canvas = canvas;
    this.ctx = ctx;
    this.balls = [new _ball2.default(canvas, ctx, [canvas.width / 2, 600], [-5, -5])];
  }

  _createClass(BallHandler, [{
    key: 'drawBalls',
    value: function drawBalls() {
      for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].drawBall();
      }
    }
  }, {
    key: 'updateBalls',
    value: function updateBalls(paddle, lives) {
      for (var i = 0; i < this.balls.length; i++) {
        if (this.balls[i].dead) {
          this.balls.splice(i, 1);
        } else {
          this.balls[i].updateBall(paddle, lives, this.balls);
        }
      }
    }
  }, {
    key: 'addBall',
    value: function addBall(pos, vel) {
      this.balls.push(new _ball2.default(this.canvas, this.ctx, pos, vel));
    }
  }]);

  return BallHandler;
}();

exports.default = BallHandler;

/***/ }),

/***/ "./lib/brick.js":
/*!**********************!*\
  !*** ./lib/brick.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _power_up = __webpack_require__(/*! ./power_up */ "./lib/power_up.js");

var _power_up2 = _interopRequireDefault(_power_up);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brick = function () {
  function Brick(canvas, ctx, brickPos, status, powerUp) {
    _classCallCheck(this, Brick);

    this.canvas = canvas;
    this.ctx = ctx;
    this.brickPos = brickPos;
    this.status = status;
    this.brickWidth = 128;
    this.brickHeight = 36;
    this.brickPadding = 0;
    this.brickOffsetTop = 0;
    this.brickOffsetLeft = 0;
    this.powerUp = powerUp;
    this.buildPowerUp();
  }

  _createClass(Brick, [{
    key: 'buildPowerUp',
    value: function buildPowerUp() {
      if (this.powerUp > 5) {
        this.powerUp = new _power_up2.default(this.canvas, this.ctx, [this.brickPos[0], this.brickPos[1]]);
      } else {
        this.powerUp = 0;
      }
    }
  }]);

  return Brick;
}();

exports.default = Brick;

/***/ }),

/***/ "./lib/brick_grid.js":
/*!***************************!*\
  !*** ./lib/brick_grid.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brick = __webpack_require__(/*! ./brick */ "./lib/brick.js");

var _brick2 = _interopRequireDefault(_brick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrickGrid = function () {
  function BrickGrid(canvas, ctx, rows, cols) {
    _classCallCheck(this, BrickGrid);

    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.won = false;
    this.brickHit = new Audio();
    this.brickHit.src = "assets/brickhit.wav";
  }

  _createClass(BrickGrid, [{
    key: "getRandomInt",
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }, {
    key: "buildGrid",
    value: function buildGrid() {
      for (var c = 0; c < this.rows; c++) {
        this.bricks[c] = [];
        for (var r = 0; r < this.cols; r++) {
          this.bricks[c][r] = new _brick2.default(this.canvas, this.ctx, [0, 0], 1, this.getRandomInt(10));
        };
      };
    }
  }, {
    key: "drawBricks",
    value: function drawBricks(paddle, ballHandler, lives) {
      for (var i = 0; i < ballHandler.balls.length; i++) {
        var ball = ballHandler.balls[i];
        for (var c = 0; c < this.rows; c++) {
          for (var r = 0; r < this.cols; r++) {
            if (this.bricks[c][r].status > 0) {
              var brickX = c * (this.bricks[c][r].brickWidth + this.bricks[c][r].brickPadding) + this.bricks[c][r].brickOffsetLeft;
              var brickY = r * (this.bricks[c][r].brickHeight + this.bricks[c][r].brickPadding) + this.bricks[c][r].brickOffsetTop;
              this.bricks[c][r].brickPos[0] = brickX;
              this.bricks[c][r].brickPos[1] = brickY;
              if (this.bricks[c][r].powerUp) {
                this.bricks[c][r].powerUp.powerUpPos[0] = brickX + this.bricks[c][r].brickWidth / 2;
                this.bricks[c][r].powerUp.powerUpPos[1] = brickY;
              }
              this.ctx.beginPath();
              this.ctx.rect(brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
              if (r % 2 === 0) {
                this.ctx.fillStyle = "purple";
                this.ctx.strokeStyle = 'blue';
              } else {
                this.ctx.fillStyle = "Blue";
                this.ctx.strokeStyle = 'purple';
              }
              this.ctx.stroke();
              this.ctx.fill();
              this.ctx.closePath();
            }
            if (this.bricks[c][r].powerUp) {
              this.bricks[c][r].powerUp.drawPowerUp(paddle, ballHandler, lives);
            }
          }
        }
      }
    }
  }, {
    key: "collisionDetection",
    value: function collisionDetection(ballHandler, gameData) {
      for (var i = 0; i < ballHandler.balls.length; i++) {
        var ball = ballHandler.balls[i];
        for (var c = 0; c < this.rows; c++) {
          for (var r = 0; r < this.cols; r++) {
            var brick = this.bricks[c][r];
            if (brick.status == 1) {
              if (ball.ballPos[0] + ball.ballRadius > brick.brickPos[0] && ball.ballPos[0] + ball.ballRadius < brick.brickPos[0] + brick.brickWidth && ball.ballPos[1] - ball.ballRadius > brick.brickPos[1] && ball.ballPos[1] - ball.ballRadius < brick.brickPos[1] + brick.brickHeight) {
                ball.velocity[1] = -ball.velocity[1];
                brick.status = 0;
                gameData.score++;
                this.brickHit.play();
                if (brick.powerUp) {
                  brick.powerUp.status = 1;
                  brick.powerUp.velocity = [0, 2];
                }
                if (gameData.score == this.rows * this.cols) {
                  this.won = true;
                }
              }
            }
          }
        }
      }
    }
  }]);

  return BrickGrid;
}();

exports.default = BrickGrid;

/***/ }),

/***/ "./lib/brickbreaker.js":
/*!*****************************!*\
  !*** ./lib/brickbreaker.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(/*! ./game */ "./lib/game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
var ctx = canvas.getContext('2d');
var newGame = new _game2.default(canvas, ctx);

document.addEventListener('keydown', newGame.togglePause);
document.addEventListener('keydown', newGame.startGame);
document.addEventListener("keydown", function () {
  return newGame.paddle.keyDownHandler(event);
}, false);
document.addEventListener("keyup", function () {
  return newGame.paddle.keyUpHandler(event);
}, false);
document.fonts.load('72px "ArcadeClassic"').then(newGame.animate);
// document.addEventListener('DOMContentLoaded', newGame.animate);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ball = __webpack_require__(/*! ./ball */ "./lib/ball.js");

var _ball2 = _interopRequireDefault(_ball);

var _paddle = __webpack_require__(/*! ./paddle */ "./lib/paddle.js");

var _paddle2 = _interopRequireDefault(_paddle);

var _brick = __webpack_require__(/*! ./brick */ "./lib/brick.js");

var _brick2 = _interopRequireDefault(_brick);

var _brick_grid = __webpack_require__(/*! ./brick_grid */ "./lib/brick_grid.js");

var _brick_grid2 = _interopRequireDefault(_brick_grid);

var _power_up = __webpack_require__(/*! ./power_up */ "./lib/power_up.js");

var _power_up2 = _interopRequireDefault(_power_up);

var _ball_handler = __webpack_require__(/*! ./ball_handler */ "./lib/ball_handler.js");

var _ball_handler2 = _interopRequireDefault(_ball_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas, ctx) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.ctx = ctx;
    this.music = new Audio();
    this.music.src = "assets/RetroWave.mp3";
    this.music.loop = true;
    this.gameOver = new Audio();
    this.gameOver.src = "assets/gameover.wav";
    this.gameData = { score: 0, lives: 3, paused: false, started: false };
    this.ballHandler = new _ball_handler2.default(canvas, ctx);
    this.paddle = new _paddle2.default(canvas, ctx);
    this.brickGrid = new _brick_grid2.default(canvas, ctx, 10, 2);
    this.brickGrid.buildGrid();
    this.animate = this.animate.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  _createClass(Game, [{
    key: 'togglePause',
    value: function togglePause(e) {
      if (e.keyCode == 32) {
        if (this.gameData.started) {
          this.gameData.paused = !this.gameData.paused;
          if (!this.gameData.paused) {
            this.animate();
          }
        }
      }
    }
  }, {
    key: 'startGame',
    value: function startGame(e) {
      if (e.keyCode == 13) {
        if (!this.gameData.started) {
          this.gameData.started = true;
          this.animate();
        }
      }
    }
  }, {
    key: 'drawLives',
    value: function drawLives() {
      this.ctx.font = "24px ArcadeClassic";
      this.ctx.fillStyle = "pink";
      this.ctx.fillText("Lives: " + this.gameData.lives, this.canvas.width - 100, 710);
    }
  }, {
    key: 'drawScore',
    value: function drawScore() {
      this.ctx.font = "24px ArcadeClassic";
      this.ctx.fillStyle = 'pink';
      this.ctx.fillText("Score: " + this.gameData.score, 12, 710);
    }
  }, {
    key: 'animate',
    value: function animate() {
      if (!this.gameData.started) {
        this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
        this.ctx.fillRect(0, 0, 1280, 720);
        this.ctx.font = "36px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("PRESS  ENTER  TO  START", 460, 360);
        return;
      }
      if (!this.gameData.paused) {
        if (!this.gameData.lives) {
          this.gameOver.play();
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("GAME OVER", 480, 360);
          return;
        }
        if (this.brickGrid.won) {
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("YOU  WIN", 480, 360);
          return;
        }
        requestAnimationFrame(this.animate);
        this.music.play();
        this.ctx.clearRect(0, 0, 1280, 720);
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
        this.ctx.fillRect(0, 0, 1280, 720);
        this.ctx.font = "36px ArcadeClassic";
        this.ctx.fillStyle = 'pink';
        this.ctx.fillText("PAUSED", 580, 360);
        this.ctx.font = "24px ArcadeClassic";
        this.ctx.fillText("Press  Spacebar  to  Resume", 480, 420);
        return;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),

/***/ "./lib/paddle.js":
/*!***********************!*\
  !*** ./lib/paddle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paddle = function () {
  function Paddle(canvas, ctx) {
    _classCallCheck(this, Paddle);

    this.canvas = canvas;
    this.ctx = ctx;
    this.paddleHeight = 20;
    this.paddleWidth = 100;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.paddlePic = new Image();
    this.paddlePic.src = 'assets/paddlePic.png';
  }

  _createClass(Paddle, [{
    key: 'drawPaddle',
    value: function drawPaddle() {
      // this.ctx.beginPath();
      this.ctx.drawImage(this.paddlePic, this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
      // this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
      // this.ctx.fillStyle = '#fd01fd';
      // this.ctx.strokeStyle = '#50F3FD';
      // this.ctx.fill();
      // this.ctx.stroke();
      // this.ctx.closePath();
    }
  }, {
    key: 'updatePaddle',
    value: function updatePaddle() {
      if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
        this.paddleX += 7;
      } else if (this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7;
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler(e) {
      if (e.keyCode == 39) {
        this.rightPressed = true;
      } else if (e.keyCode == 37) {
        this.leftPressed = true;
      }
    }
  }, {
    key: 'keyUpHandler',
    value: function keyUpHandler(e) {
      if (e.keyCode == 39) {
        this.rightPressed = false;
      } else if (e.keyCode == 37) {
        this.leftPressed = false;
      }
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;

/***/ }),

/***/ "./lib/power_up.js":
/*!*************************!*\
  !*** ./lib/power_up.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ball = __webpack_require__(/*! ./ball */ "./lib/ball.js");

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PowerUp = function () {
  function PowerUp(canvas, ctx, pos) {
    _classCallCheck(this, PowerUp);

    this.canvas = canvas;
    this.ctx = ctx;
    this.powerUpPos = pos;
    this.velocity = [0, 0];
    this.powerUpRadius = 10;
    this.status = 0;
    this.type = this.assignPowerUp();
    this.powerUpSound = new Audio();
    this.powerUpSound.src = "assets/powerup.wav";
  }

  _createClass(PowerUp, [{
    key: 'drawPowerUp',
    value: function drawPowerUp(paddle, ballHandler, lives) {
      if (this.status > 0) {
        this.ctx.beginPath();
        if (this.type === 1) {
          this.ctx.fillStyle = 'green';
        }
        if (this.type === 2) {
          this.ctx.fillStyle = 'red';
        }
        if (this.type === 3) {
          this.ctx.fillStyle = 'blue';
        }
        this.ctx.strokeStyle = 'blue';
        this.ctx.arc(this.powerUpPos[0], this.powerUpPos[1], this.powerUpRadius, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.fill();
        this.updatePowerUp(paddle, ballHandler, lives);
      }
    }
  }, {
    key: 'updatePowerUp',
    value: function updatePowerUp(paddle, ballHandler, lives) {
      var _this = this;

      var ballLength = ballHandler.balls.length;
      for (var i = 0; i < ballLength; i++) {
        var ball = ballHandler.balls[i];
        if (this.powerUpPos[1] + this.powerUpRadius === 720 - paddle.paddleHeight) {
          if (this.powerUpPos[0] > paddle.paddleX && this.powerUpPos[0] < paddle.paddleX + paddle.paddleWidth && this.powerUpPos[1] + this.powerUpRadius === 720 - paddle.paddleHeight) {
            this.powerUpSound.play();
            if (this.type === 1) {
              this.status = 0;
              lives.lives++;
            }
            if (this.type === 2) {
              this.status = 0;
              paddle.paddleWidth = paddle.paddleWidth * 2;
              setTimeout(function () {
                return _this.reducePaddleWidth(paddle);
              }, 10000);
            }
            if (this.type === 3) {
              this.status = 0;
              ballHandler.addBall([paddle.paddleX + paddle.paddleWidth / 2, 600], [-5, -5]);
              ballHandler.addBall([paddle.paddleX, 600], [5, -5]);
              lives.lives = lives.lives + 2;
            }
          }
        }
      }
      this.powerUpPos[0] += this.velocity[0];
      this.powerUpPos[1] += this.velocity[1];
    }
  }, {
    key: 'assignPowerUp',
    value: function assignPowerUp() {
      return Math.floor(Math.random() * Math.floor(3)) + 1;
    }
  }, {
    key: 'reducePaddleWidth',
    value: function reducePaddleWidth(paddle) {
      paddle.paddleWidth = paddle.paddleWidth / 2;
    }
  }]);

  return PowerUp;
}();

exports.default = PowerUp;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map