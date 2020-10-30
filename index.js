//sound
class AudioController {
  constructor() {
    this.bgMusic = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3');
    this.victorySound = new Audio("./Ta Da-SoundBible.com-1884170640.mp3");
    this.gameOverSound = new Audio("./Crash-sound-effect.mp3");
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}


const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");
let backgroundSound = new AudioController();
let background = new Image();
background.src = "./halloween.jpg";

let snake = [
  { x: 380, y: 400 },
  { x: 360, y: 400 },
  { x: 340, y: 400 },
  { x: 320, y: 400 },
  { x: 300, y: 400 },
  { x: 280, y: 400 },
  { x: 260, y: 400 },
  { x: 240, y: 400 },
  { x: 220, y: 400 },
  { x: 200, y: 400 },
];

let directionChanging = false;
let dx = 20;
let dy = 0;

const board_border = "green";
const board_background = "black";
const snake_col = "limegreen";
const snake_border = "darkred";

main();
backgroundSound.startMusic();
createFood();
createSuperFood();
superFood();

document.addEventListener("keydown", directionChange);

function main() {
  if (isGameOver()) {
    backgroundSound.gameOver();
    if(confirm("YOU LOST! PRESS OK TO RESTART.")){
      window.location ='/'
    }
  }
  directionChanging = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    drawSuperFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

function superFood() {
  setTimeout(function () {
    createSuperFood();
    superFood();
  }, 3000);
}

function clearCanvas() {
  var gradient = ctx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop("0", "blue");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "green");

  ctx.lineWidth = 5;
  ctx.fillStyle = board_background;
  ctx.strokeStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
}
function drawSnake() {
  snake.forEach(drawSnakeBody);
}

function drawFood() {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "blue";
  ctx.fillRect(xFood, yFood, 20, 20);
}

function drawSuperFood() {
  ctx.fillStyle = "DeepSkyBlue";
  ctx.strokestyle = "blue";
  ctx.fillRect(xSuperFood, ySuperFood, 20, 20);
}

function drawSnakeBody(snakeBody) {
  ctx.fillStyle = snake_col;
  ctx.lineWidth = 1;
  ctx.strokeStyle = snake_border;
  ctx.fillRect(snakeBody.x, snakeBody.y, 20, 20);
  ctx.strokeRect(snakeBody.x, snakeBody.y, 20, 20);
}

function isGameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  const topWallCollision = snake[0].y < 0;
  const bottomWallCollision = snake[0].y > canvas.height - 20;
  const leftWallCollision = snake[0].x < 0;
  const rightWallCollision = snake[0].x > canvas.width - 20;
  return (topWallCollision || bottomWallCollision || leftWallCollision || rightWallCollision)
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
  xFood = randomFood(0, canvas.width - 10);
  yFood = randomFood(0, canvas.height - 10);
  snake.forEach(function didSnakeEat(part) {
    const ateFood = part.x == xFood && part.y == yFood;
    if (ateFood) createFood();
  });
}

function createSuperFood() {
  xSuperFood = randomFood(0, canvas.width - 10);
  ySuperFood = randomFood(0, canvas.height - 10);
}


function directionChange(e) {
  if (directionChanging) return;
  directionChanging = true;
  const key = e.keyCode;
  const goingUp = dy === -10 * 2;
  const goingDown = dy === 10 * 2;
  const goingRight = dx === 10 * 2;
  const goingLeft = dx === -10 * 2;

  if (key === 37 && !goingRight) {
    dx = -10 * 2;
    dy = 0;
  }

  if (key === 38 && !goingDown) {
    dx = 0;
    dy = -10 * 2;
  }

  if (key === 39 && !goingLeft) {
    dx = 10 * 2;
    dy = 0;
  }

  if (key === 40 && !goingUp) {
    dx = 0;
    dy = 10 * 2;
  }
}

let scoreNum = 0.0;
let levelNum= 1.0;
let newLevelNum = 0.0;

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const snakeAteFood = snake[0].x === xFood && snake[0].y === yFood;

  const snakeAteSuperFood = snake[0].x === xSuperFood && snake[0].y === ySuperFood;
  if (snakeAteFood) {
    scoreNum += 10;
    newLevelNum= scoreNum/50;
    document.getElementById("scoreNum").innerHTML = scoreNum;
    createFood();
    createSuperFood();
    if(newLevelNum>levelNum){
      levelNum++
      document.getElementById("levelNum").innerHTML = levelNum;
      scoreNum += 10;
      newLevelNum= scoreNum/50;
      alert("New Level");
      backgroundSound.victory();
    } 
  } else if (snakeAteSuperFood) {
    scoreNum += 20;
    document.getElementById("scoreNum").innerHTML = scoreNum;
  }  else {
    snake.pop();
  }
}


//popup 

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);