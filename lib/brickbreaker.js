import Game from './game';

const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
const newGame = new Game(canvas, ctx);

document.addEventListener('keydown', newGame.togglePause);
document.addEventListener('keydown', newGame.startGame);
document.addEventListener("keydown", () => newGame.paddle.keyDownHandler(event), false);
document.addEventListener("keyup", () => newGame.paddle.keyUpHandler(event), false);
document.fonts.load('72px "ArcadeClassic"').then(newGame.animate);
// document.addEventListener('DOMContentLoaded', newGame.animate);
