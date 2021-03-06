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
  function Ball(canvas, ctx, ballPos, velocity, gameData) {
    _classCallCheck(this, Ball);

    this.canvas = canvas;
    this.ctx = ctx;
    this.ballPos = ballPos;
    this.velocity = velocity;
    this.gameData = gameData;
    this.ballRadius = 20;
    this.dead = false;
    this.paddleHit = new Audio();
    this.paddleHit.src = "assets/paddlehit.wav";
    this.ballPic = new Image();
    this.ballPic.src = 'assets/ball.png';
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
      // this.ctx.drawImage(this.ballPic, this.ballPos[0], this.ballPos[1], this.ballRadius * 2, this.ballRadius * 2);
    }
  }, {
    key: 'updateBall',
    value: function updateBall(paddle, lives, balls, gameData) {
      if (this.ballPos[0] + this.ballRadius > 1280 || this.ballPos[0] - this.ballRadius < 0) {
        this.velocity[0] = -this.velocity[0];
      }
      if (this.ballPos[1] - this.ballRadius < 0) {
        this.velocity[1] = -this.velocity[1];
      } else if (this.ballPos[1] + this.ballRadius >= 720 - paddle.paddleHeight) {
        this.paddleHit.play();
        this.paddleReflector(balls, gameData, paddle);
      }
      this.ballPos[0] += this.velocity[0];
      this.ballPos[1] += this.velocity[1];
    }
  }, {
    key: 'paddleReflector',
    value: function paddleReflector(balls, gameData, paddle) {
      var paddleSectorOne = paddle.paddleX + paddle.paddleWidth / 4;
      var paddleSectorTwo = paddle.paddleX + paddle.paddleWidth / 2;
      var paddleSectorThree = paddle.paddleX + (paddle.paddleWidth / 2 + paddle.paddleWidth / 4);
      var paddleSectorFour = paddle.paddleX + paddle.paddleWidth;

      if (this.ballPos[0] + this.ballRadius >= paddleSectorThree && this.ballPos[0] - this.ballRadius < paddleSectorFour) {
        // console.log('right hit');
        this.velocity = [5, -5];
      } else if (this.ballPos[0] + this.ballRadius >= paddle.paddleX && this.ballPos[0] - this.ballRadius < paddleSectorOne) {
        // console.log('left hit');
        this.velocity = [-5, -5];
      } else if (this.ballPos[0] + this.ballRadius >= paddleSectorTwo && this.ballPos[0] - this.ballRadius < paddleSectorThree) {
        // console.log('right mid hit');
        this.velocity = [1, -7];
      } else if (this.ballPos[0] + this.ballRadius >= paddleSectorOne && this.ballPos[0] - this.ballRadius <= paddleSectorTwo) {
        // console.log('left mid hit');
        this.velocity = [-1, -7];
      } else {
        if (balls.length > 1) {
          this.dead = true;
          gameData.lives--;
        } else {
          gameData.lives--;
          this.ballPos = [this.canvas.width / 2, 600];
          this.velocity = [-5, -5];
          paddle.paddleX = (this.canvas.width - paddle.paddleWidth) / 2;
          this.gameData.stopped = true;
        }
      }
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
  function BallHandler(canvas, ctx, gameData) {
    _classCallCheck(this, BallHandler);

    this.canvas = canvas;
    this.ctx = ctx;
    this.gameData = gameData;
    this.balls = [new _ball2.default(canvas, ctx, [canvas.width / 2, 600], [-5, -5], this.gameData)];
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
          this.balls[i].updateBall(paddle, lives, this.balls, this.gameData);
        }
      }
    }
  }, {
    key: 'addBall',
    value: function addBall(pos, vel) {
      this.balls.push(new _ball2.default(this.canvas, this.ctx, pos, vel, this.gameData));
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
  function Brick(canvas, ctx, brickPos, status, powerUp, gameData) {
    _classCallCheck(this, Brick);

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

  _createClass(Brick, [{
    key: 'buildPowerUp',
    value: function buildPowerUp() {
      if (this.powerUp > 5) {
        this.powerUp = new _power_up2.default(this.canvas, this.ctx, [this.brickPos[0], this.brickPos[1]], this.gameData);
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
  function BrickGrid(canvas, ctx, rows, cols, gameData) {
    _classCallCheck(this, BrickGrid);

    this.canvas = canvas;
    this.ctx = ctx;
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.gameData = gameData;
    this.won = false;
    this.originalScore = 0;
    this.brickHit = new Audio();
    this.brickHit.src = "assets/brickhit.wav";
    this.redbrick = new Image();
    this.redbrick.src = 'assets/redbrick.png';
    this.bluebrick = new Image();
    this.bluebrick.src = 'assets/bluebrick.png';
  }

  _createClass(BrickGrid, [{
    key: 'getRandomInt',
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }, {
    key: 'buildGrid',
    value: function buildGrid() {
      this.originalScore = this.gameData.score;
      for (var c = 0; c < this.rows; c++) {
        this.bricks[c] = [];
        for (var r = 0; r < this.cols; r++) {
          this.bricks[c][r] = new _brick2.default(this.canvas, this.ctx, [0, 0], 1, this.getRandomInt(10), this.gameData);
        };
      };
    }
  }, {
    key: 'drawBricks',
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
              if (r % 2 === 0) {
                this.ctx.drawImage(this.redbrick, brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
              } else {
                this.ctx.drawImage(this.bluebrick, brickX, brickY, this.bricks[c][r].brickWidth, this.bricks[c][r].brickHeight);
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
    key: 'collisionDetection',
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
                if (this.gridWon()) {
                  this.won = true;
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: 'gridWon',
    value: function gridWon() {
      for (var c = 0; c < this.rows; c++) {
        for (var r = 0; r < this.cols; r++) {
          if (this.bricks[c][r].status > 0) {
            return false;
          }
        }
      }
      return true;
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

document.getElementById('mute').addEventListener('click', newGame.muteSound);
document.addEventListener('keydown', newGame.togglePause);
document.addEventListener('keydown', newGame.startGame);
document.addEventListener("keydown", function () {
  return newGame.paddle.keyDownHandler(event);
}, false);
document.addEventListener("keyup", function () {
  return newGame.paddle.keyUpHandler(event);
}, false);
document.fonts.load('72px "ArcadeClassic"').then(newGame.animate);

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
    this.gameData = { score: 0, lives: 3, paused: false, started: false, highScore: 0, stopped: false, sound: true };
    this.ballHandler = new _ball_handler2.default(canvas, ctx, this.gameData);
    this.paddle = new _paddle2.default(canvas, ctx);
    this.levels = [new _brick_grid2.default(canvas, ctx, 0, 0, this.gameData), new _brick_grid2.default(canvas, ctx, 10, 2, this.gameData), new _brick_grid2.default(canvas, ctx, 10, 3, this.gameData), new _brick_grid2.default(canvas, ctx, 10, 4, this.gameData)];
    this.brickGrid = this.levels[0];
    this.animate = this.animate.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.muteSound = this.muteSound.bind(this);
  }

  _createClass(Game, [{
    key: 'togglePause',
    value: function togglePause(e) {
      if (e.keyCode == 32) {
        if (this.gameData.started && !this.gameData.stopped) {
          this.gameData.paused = !this.gameData.paused;
          if (!this.gameData.paused) {
            this.animate();
          }
        }
        if (this.gameData.stopped) {
          this.gameData.stopped = !this.gameData.stopped;
          this.animate();
        }
      }
    }
  }, {
    key: 'startGame',
    value: function startGame(e) {
      if (e.keyCode == 13) {
        if (!this.gameData.started || this.brickGrid.won) {
          this.gameData.started = true;
          this.levels.shift();
          this.brickGrid = this.levels[0];
          this.ballHandler = new _ball_handler2.default(this.canvas, this.ctx, this.gameData);
          if (this.gameData.started) {
            this.brickGrid.buildGrid();
            this.animate();
          }
        }
        if (!this.gameData.lives) {
          this.resetGame();
          this.animate();
        }
      }
    }
  }, {
    key: 'resetGame',
    value: function resetGame() {
      this.ballHandler = new _ball_handler2.default(this.canvas, this.ctx, this.gameData);
      this.paddle = new _paddle2.default(this.canvas, this.ctx);
      this.levels = [new _brick_grid2.default(this.canvas, this.ctx, 10, 2, this.gameData), new _brick_grid2.default(this.canvas, this.ctx, 10, 3, this.gameData), new _brick_grid2.default(this.canvas, this.ctx, 10, 4, this.gameData)];
      this.brickGrid = this.levels[0];
      this.brickGrid.buildGrid();
      var oldHighScore = this.gameData.highScore;
      this.gameData = { score: 0, lives: 3, paused: false, started: true, highScore: oldHighScore, stopped: false, sound: true };
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
    key: 'muteSound',
    value: function muteSound(e) {
      this.gameData.sound = !this.gameData.sound;
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
          if (this.gameData.score > this.gameData.highScore) {
            this.gameData.highScore = this.gameData.score;
          }
          this.gameOver.play();
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("GAME OVER", 480, 360);
          this.ctx.font = "32px ArcadeClassic";
          this.ctx.fillText('HIGHSCORE: ' + this.gameData.highScore, 540, 430);
          this.ctx.font = "24px ArcadeClassic";
          this.ctx.fillText('PRESS ENTER TO RESTART', 510, 500);
          return;
        }
        if (this.gameData.stopped) {
          this.music.pause();
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "36px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("CONTINUE", 560, 360);
          this.ctx.font = "24px ArcadeClassic";
          this.ctx.fillText("Press  Spacebar", 550, 420);
          return;
        }
        if (this.brickGrid.won && this.levels.length === 1) {
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("YOU  WIN", 500, 360);
          this.ctx.font = "72px ArcadeClassic";
          return;
        }
        if (this.brickGrid.won && this.levels.length > 1) {
          this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
          this.ctx.fillRect(0, 0, 1280, 720);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillStyle = 'pink';
          this.ctx.fillText("YOU  WIN", 500, 360);
          this.ctx.font = "72px ArcadeClassic";
          this.ctx.fillText("Press Enter to Continue", 320, 420);
          return;
        }
        if (!this.gameData.sound) {
          this.music.pause();
        } else {
          this.music.play();
        }
        requestAnimationFrame(this.animate);
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
        this.ctx.fillText("Press  Spacebar  to  Resume", 490, 420);
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
      this.ctx.drawImage(this.paddlePic, this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
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
  function PowerUp(canvas, ctx, pos, gameData) {
    _classCallCheck(this, PowerUp);

    this.canvas = canvas;
    this.ctx = ctx;
    this.powerUpPos = pos;
    this.gameData = gameData;
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
              this.gameData.score++;
            }
            if (this.type === 2) {
              this.status = 0;
              paddle.paddleWidth = paddle.paddleWidth * 2;
              setTimeout(function () {
                return _this.reducePaddleWidth(paddle);
              }, 10000);
              this.gameData.score++;
            }
            if (this.type === 3) {
              this.status = 0;
              ballHandler.addBall([paddle.paddleX + paddle.paddleWidth / 2, 600], [-5, -5]);
              ballHandler.addBall([paddle.paddleX, 600], [5, -5]);
              lives.lives = lives.lives + 2;
              this.gameData.score++;
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