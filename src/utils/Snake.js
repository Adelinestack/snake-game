function getNewSnakeHead(direction, snakePositions) {
  const snakeHeadIndex = snakePositions.length - 1;

  if (direction === 'right') {
    return [
      ...snakePositions,
      [
        snakePositions[snakeHeadIndex][0],
        snakePositions[snakeHeadIndex][1] + 1,
      ],
    ];
  } else if (direction === 'left') {
    return [
      ...snakePositions,
      [
        snakePositions[snakeHeadIndex][0],
        snakePositions[snakeHeadIndex][1] - 1,
      ],
    ];
  } else if (direction === 'up') {
    return [
      ...snakePositions,
      [
        snakePositions[snakeHeadIndex][0] - 1,
        snakePositions[snakeHeadIndex][1],
      ],
    ];
  } else if (direction === 'down') {
    return [
      ...snakePositions,
      [
        snakePositions[snakeHeadIndex][0] + 1,
        snakePositions[snakeHeadIndex][1],
      ],
    ];
  }
}

function isEatingHimself(prevState) {
  const snakeHeadPosition =
    prevState.snakePosition[prevState.snakePosition.length - 1];
  const snakeBody = prevState.snakePosition.slice(
    0,
    prevState.snakePosition.length - 2
  );
  const isEatingSnake = snakeBody.find(
    position =>
      position[0] === snakeHeadPosition[0] &&
      position[1] === snakeHeadPosition[1]
  );
  if (isEatingSnake) {
    return {
      gameState: 'end',
    };
  }
  return null;
}

function isEatingWall(prevState, prevProps) {
  const snakeHeadPosition =
    prevState.snakePosition[prevState.snakePosition.length - 1];
  const gridLimits = prevProps.grid.length;
  const snakeHeadLimits =
    snakeHeadPosition[0] < 0 ||
    snakeHeadPosition[0] > gridLimits ||
    snakeHeadPosition[1] < 0 ||
    snakeHeadPosition[1] > gridLimits;
  if (snakeHeadLimits) {
    return { gameState: 'end' };
  }
  return null;
}
export { getNewSnakeHead, isEatingHimself, isEatingWall };
