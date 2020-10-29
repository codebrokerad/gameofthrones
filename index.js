const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");

let background = new Image();
background.src = "/halloween.jpg";

let snake = [
  { x: 200, y: 100 },
  { x: 200, y: 110 },
  { x: 200, y: 120 },
  { x: 200, y: 130 },
  { x: 200, y: 140 },
  { x: 200, y: 150 },
  { x: 200, y: 160 },
  { x: 200, y: 170 },
  { x: 200, y: 180 },
  { x: 200, y: 190 },
  { x: 200, y: 200 },
];

let directionChanging = false;
let dx = 10;
let dy = 0;

const board_border = "green";
const board_background = "black";
const snake_col = "limegreen";
const snake_border = "darkred";

main();
createFood();

document.addEventListener("keydown", directionChange);

function main() {
  if (gameOver()) {
    alert("Oh no! You lose");
    document.location.reload();
  }
  directionChanging = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
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
  ctx.fillRect(xFood, yFood, 10, 10);
}


function drawSnakeBody(snakeBody) {
  ctx.fillStyle = snake_col;
  ctx.lineWidth = 1;
  ctx.strokeStyle = snake_border;
  ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
  ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
}
function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  const topWallCollision = snake[0].y < 0;
  const bottomWallCollision = snake[0].y > canvas.height - 10;
  const leftWallCollision = snake[0].x < 0;
  const rightWallCollision = snake[0].x > canvas.width - 10;
  return (
    topWallCollision ||
    bottomWallCollision ||
    leftWallCollision ||
    rightWallCollision
  );
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  xFood = randomFood(0, canvas.width - 10);
  yFood = randomFood(0, canvas.height - 10);
  snake.forEach(function didSnakeEat(part) {
    const ateFood = part.x == xFood && part.y == yFood;
    if (ateFood) createFood();
  });
}

function directionChange(e) {
  //left = 37;
  //right key= 39;
  //up key= 38;
  //down key = 40;

  if (directionChanging) return;
  directionChanging = true;
  const key = e.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (key === 37 && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (key === 38 && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (key === 39 && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (key === 40 && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

let scoreNum = 0;

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const snakeAteFood = snake[0].x === xFood && snake[0].y === yFood;
  if (snakeAteFood) {
    scoreNum += 10;
    document.getElementById("scoreNum").innerHTML = scoreNum;
    createFood();
  } else {
    snake.pop();
  }
}
