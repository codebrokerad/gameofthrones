const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");

let background = new Image();
background.src = "/halloween.jpg";

// Make sure the image is loaded first otherwise nothing will draw.

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
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

const board_border = "green";
const board_background = "black";
const snake_col = "red";
const snake_border = "darkred";

// Main function
main();
gen_food();

document.addEventListener("keydown", change_direction);

function main() {
  if (has_game_ended()) {
    alert("You lose");
    document.location.reload();
  }
  changing_direction = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    move_snake();
    drawSnake();
    main();
  }, 100);
}

// draw a border around the canvas
function clearCanvas() {
  var gradient = ctx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop("0", "blue");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "green");

  //ctx.strokeStyle = gradient;
  ctx.lineWidth = 5;
  //  Select the colour to fill the drawing
  ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  ctx.strokeStyle = gradient;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakeBody);
}

function drawFood() {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "blue";
  ctx.fillRect(food_x, food_y, 10, 10);
}


// Draw one snake part
function drawSnakeBody(snakeBody) {
  // Set the colour of the snake part
  ctx.fillStyle = snake_col;

  ctx.lineWidth = 1;
  // Set the border colour of the snake part
  ctx.strokeStyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
  // Draw a border around the snake part
  ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
}
function has_game_ended() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function random_food(min, max) {
  return (Math.round((Math.random() * (max - min) + min) / 10) * 10);
}



function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(0, canvas.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, canvas.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}


function change_direction(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = e.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

scoreNum = 0;

function move_snake() {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Increase score
    scoreNum += 10;
    // Display score on screen
    document.getElementById("scoreNum").innerHTML = scoreNum;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
