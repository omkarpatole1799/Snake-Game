"use strict";
const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const difficultyLevelElement = document.getElementById("difficulty-level");
const startButton = document.getElementById("start-button");

let snakeArr;
let snakeFood;
let snakeMovements;
let isDiffifulyLevelSelected = false;
let isGameStarted = false;
let score = 0;
let speed = 250; // default speed
let level = 0;

function setSpeed(l) {
  // l = level
  if (l === "1") {
    speed = 250;
    console.log(speed);
  }
  if (l === "2") {
    speed = 200;
    console.log(speed);
  }
  if (l === "3") {
    speed = 100;
    console.log(speed);
  }
}

difficultyLevelElement.addEventListener("change", () => {
  level =
    difficultyLevelElement.options[difficultyLevelElement.selectedIndex].value;
});

startButton.addEventListener("click", () => {
  if (level === 0) {
    alert("Please select a level!");
  } else {
    newGame();
  }
});

function newGame() {
  console.log(level); // this showing perfect level as selected (1,2,3)
  setSpeed(level);
  snakeArr = [
    {
      x: 10,
      y: 10,
    },
  ];
  snakeFood = [
    { x: 10, y: 14 }, // food 1
    { x: 15, y: 5 }, // food 2
  ];
  snakeMovements = { x: 0, y: 0 };
  score = 0;

  isGameStarted = true;

  if (isGameStarted) {
    setInterval(() => {
      gameEngine();
    }, speed);
  }
}

// check collision
function isColloide(snape) {
  // self collision
  for (let i = 1; i < snape.length; i++) {
    if (snape[i].x === snape[0].x && snape[i].y === snape[0].y) {
      newGame();
      return true;
    }
  }
  // wall collision
  if (
    snape[0].x >= 20 ||
    snape[0].y >= 20 ||
    snape[0].x <= 0 ||
    snape[0].y <= 0
  ) {
    newGame();
    return true;
  }
  return false;
}
// check if food is eaten
function checkFoodEaten(snape) {
  let condition1 =
    snape[0].x === snakeFood[0].x && snape[0].y === snakeFood[0].y;
  let condition2 =
    snape[0].x === snakeFood[1].x && snape[0].y === snakeFood[1].y;
  if (condition1) {
    score += 1;
    return { first: true, second: false };
  }
  if (condition2) {
    score += 1;
    return { first: false, second: true };
  }
  return { first: false, second: false };
}

// random number generate function
function generateRandomNumber() {
  return Math.floor(Math.random() * 19) + 1;
}

// generate food
function generateFood() {
  let a, b;
  a = generateRandomNumber();
  b = generateRandomNumber();
  snakeFood[0] = { x: a, y: b };
}

function generateFood2() {
  let a, b;
  a = generateRandomNumber();
  b = generateRandomNumber();
  snakeFood[1] = { x: a, y: b };
}

// game engine
function gameEngine() {
  scoreEl.innerHTML = `Score: ${score}`;
  if (isColloide(snakeArr, level)) {
    return;
  }
  // generate food if eaten
  let check = checkFoodEaten(snakeArr);
  if (check.first === true && check.second === false) {
    snakeArr.unshift({
      x: snakeArr[0].x + snakeMovements.x,
      y: snakeArr[0].y + snakeMovements.y,
    });
    generateFood();
  }

  if (check.second === true && check.first === false) {
    snakeArr.unshift({
      x: snakeArr[0].x + snakeMovements.x,
      y: snakeArr[0].y + snakeMovements.y,
    });
    generateFood2();
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  // snake movements
  snakeArr[0].x += snakeMovements.x;
  snakeArr[0].y += snakeMovements.y;

  board.style.display = "";
  // display snake
  board.innerHTML = "";

  snakeArr.forEach((element, i) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.style.gridRowStart = element.y;
    if (i === 0) {
      snakeElement.classList.add("snake-head");
    } else {
      snakeElement.classList.add("snake-body");
    }
    board.appendChild(snakeElement);
  });

  // disply food 1
  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = snakeFood[0].x;
  foodElement.style.gridRowStart = snakeFood[0].y;
  foodElement.classList.add("snake-food");
  board.appendChild(foodElement);

  // display food 2
  let foodElement2 = document.createElement("div");
  foodElement2.style.gridColumnStart = snakeFood[1].x;
  foodElement2.style.gridRowStart = snakeFood[1].y;
  foodElement2.classList.add("snake-food");
  board.appendChild(foodElement2);

  // controls
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snakeMovements.x = 0;
        snakeMovements.y = -1;

        break;

      case "ArrowDown":
        snakeMovements.x = 0;
        snakeMovements.y = 1;
        break;

      case "ArrowLeft":
        snakeMovements.x = -1;
        snakeMovements.y = 0;
        break;

      case "ArrowRight":
        snakeMovements.x = 1;
        snakeMovements.y = 0;
        break;

      default:
        break;
    }
  });
}
