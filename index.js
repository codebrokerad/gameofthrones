const canvas = document.getElementById("snakecanvas");
const ctx = canvas.getContext("2d");


// var gradient = ctx.createLinearGradient(0, 0, 170, 0);
// gradient.addColorStop("0", "magenta");
// gradient.addColorStop("0.5", "orange");
// gradient.addColorStop("1.0", "green");

// ctx.strokeStyle = gradient;
// ctx.lineWidth = 15;
// ctx.strokeRect(20, 20, 150, 100);

let snake = [
  { x: 200, y: 150 },
  { x: 200, y: 160 },
  { x: 200, y: 170 },
  { x: 200, y: 180 },
  { x: 200, y: 190 },
  { x: 200, y: 200 },
];

const board_border = "white";
const board_background = "black";
const snake_col = "red";
const snake_border = "darkred";

 // Start game
 main();

function main() {
  setTimeout(function onTick() 
   {   
  clearCanvas();
  drawSnake();
  // advanceSnake();  
  main();
  }, 100)
}


// draw a border around the canvas
function clearCanvas() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}


// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakeBody);
}

// Draw one snake part
function drawSnakeBody(snakeBody) {
  // Set the colour of the snake part
  ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
  // Draw a border around the snake part
  ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
}

//Snake Movement 
function snakeMovement() {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dx};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  snake.pop();
}

