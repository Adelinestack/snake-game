function directionOfKeyPressed(keyPressed) {
  switch (keyPressed) {
    case 'ArrowUp':
      return 'up';
    case 'ArrowDown':
      return 'down';
    case 'ArrowLeft':
      return 'left';
    case 'ArrowRight':
      return 'right';
    default:
      return 'right';
  }
}
function getRandomFoodPosition(snakePosition) {
  const randomPositionsFood = [
    Math.floor(Math.random() * Math.floor(7)),
    Math.floor(Math.random() * Math.floor(7)),
  ];
  const isSnakePositions = snakePosition.find(
    position =>
      position[0] === randomPositionsFood[0] &&
      position[1] === randomPositionsFood[1]
  );
  return isSnakePositions
    ? getRandomFoodPosition(snakePosition)
    : randomPositionsFood;
}

function isCellHasFood(rowIndex, colIndex, foodPosition) {
  const isFood = foodPosition[1] === colIndex && foodPosition[0] === rowIndex;

  if (isFood) {
    return 'food';
  }
  return 'cell';
}
export { directionOfKeyPressed, getRandomFoodPosition, isCellHasFood };
