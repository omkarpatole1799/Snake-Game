let lastDirection = { x: 0, y: 0 };

export function moveSnake(snakeMovements) {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (lastDirection.y !== 0){
            break;
        }
        snakeMovements.x = 0;
        snakeMovements.y = -1;
        break;

      case "ArrowDown":
        if (lastDirection.y !== 0){
            break;
        }
        snakeMovements.x = 0;
        snakeMovements.y = 1;
        break;

      case "ArrowLeft":
        if (lastDirection.x !== 0){
            break;
        }
        snakeMovements.x = -1;
        snakeMovements.y = 0;
        break;

      case "ArrowRight":
        if (lastDirection.x !==0){
            break;
        }
        snakeMovements.x = 1;
        snakeMovements.y = 0;
        break;

      default:
        break;
    }
  });
  lastDirection = snakeMovements;
}
