const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");
let backgroundSound = new Audio("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3");
let background = new Image();
background.src = "/halloween.jpg";

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
backgroundSound.play();
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
  ctx.fillRect(xFood, yFood, 20, 20);
}



function drawSnakeBody(snakeBody) {
  ctx.fillStyle = snake_col;
  ctx.lineWidth = 1;
  ctx.strokeStyle = snake_border;
  ctx.fillRect(snakeBody.x, snakeBody.y, 20, 20);
  ctx.strokeRect(snakeBody.x, snakeBody.y, 20, 20);
}
function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  const topWallCollision = snake[0].y < 0;
  const bottomWallCollision = snake[0].y > canvas.height - 20;
  const leftWallCollision = snake[0].x < 0;
  const rightWallCollision = snake[0].x > canvas.width - 20;
  return topWallCollision || bottomWallCollision || leftWallCollision || rightWallCollision 
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
  xFood = randomFood(0, canvas.width - 10);
  yFood = randomFood(0, canvas.height - 10);
  snake.forEach(function didSnakeEat (part) {
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

let scoreNum = 0;

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const snakeAteFood = snake[0].x === xFood && snake[0].y === yFood;
  if (snakeAteFood) {
    scoreNum += 10;
    document.getElementById("scoreNum").innerHTML = scoreNum;
    createFood();
  if (scoreNum === 20 ) {
      alert("You win yehuuuuu");
      document.location.reload();
    }
  } else {
    snake.pop();
  }
}

//let levelNum = 1; 

//function level() {
  //if (scoreNum >= 10) {
    //levelNum += 1;
   // document.getElementById("levelNum").innerHTML = levelNum;
  //}
  
//}

//level(scoreNum);
