import React, { Component } from 'react';
import Cell from './Cell';
import './grid.css';

const DEFAULT_STATE = {
  direction: 'right',
  snakePosition: [[0, 0]],
  snakeSize: 1,
  foodPosition: [0, 0],
  foodEaten: 0,
  gameState: 'play',
};

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = null;
    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    this.showFood();
    this.grid.focus();
    this.gameStart();
  }

  gameStart() {
    setInterval(() => {
      this.moveSnake(this.state.direction);
    }, 300);
  }

  onKeyPress({ key }) {
    if (key === 'ArrowUp') {
      this.setState({ direction: 'up' });
    } else if (key === 'ArrowDown') {
      this.setState({ direction: 'down' });
    } else if (key === 'ArrowRight') {
      this.setState({ direction: 'right' });
    } else if (key === 'ArrowLeft') {
      this.setState({ direction: 'left' });
    }
  }

  getNewSnakeHead(direction, snakePositions) {
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

  moveSnake(direction) {
    this.setState(prevState => ({
      snakePosition: this.getNewSnakeHead(
        direction,
        prevState.snakePosition
      ).slice(prevState.snakeSize === prevState.snakePosition.length ? 1 : 0),
    }));
    this.setState(prevState => {
      const snakeHeadPosition =
        prevState.snakePosition[prevState.snakePosition.length - 1];
      const isEatingFood =
        this.isCellHasFood(snakeHeadPosition[0], snakeHeadPosition[1]) ===
        'food';
      if (isEatingFood) {
        this.showFood();
        return {
          snakeSize: prevState.snakeSize + 1,
          foodEaten: prevState.foodEaten + 1,
        };
      }
    });
    this.setState(this.isEatingHimself);
    this.setState(this.isEatingWall);
  }

  isEatingHimself(prevState) {
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

  isEatingWall(prevState) {
    const snakeHeadPosition =
      prevState.snakePosition[prevState.snakePosition.length - 1];
    const gridLimits = this.props.grid.length;
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

  getRandomFoodPosition() {
    const randomPositionsFood = [
      Math.floor(Math.random() * Math.floor(7)),
      Math.floor(Math.random() * Math.floor(7)),
    ];
    const isSnakePositions = this.state.snakePosition.find(
      position =>
        position[0] === randomPositionsFood[0] &&
        position[1] === randomPositionsFood[1]
    );
    return isSnakePositions
      ? this.getRandomFoodPosition()
      : randomPositionsFood;
  }

  showFood() {
    this.setState({
      foodPosition: this.getRandomFoodPosition(),
    });
  }

  isCellHasSnake(rowIndex, colIndex) {
    const isSnake = this.state.snakePosition.find(
      position => position[1] === colIndex && position[0] === rowIndex
    );
    if (isSnake) {
      return 'snake';
    }
    return this.isCellHasFood(rowIndex, colIndex);
  }

  isCellHasFood(rowIndex, colIndex) {
    const isFood =
      this.state.foodPosition[1] === colIndex &&
      this.state.foodPosition[0] === rowIndex;

    if (isFood) {
      return 'food';
    }
    return 'cell';
  }

  restart() {
    this.setState(DEFAULT_STATE);
    this.showFood();
  }

  render() {
    const { grid } = this.props;
    const { gameState, foodEaten } = this.state;
    const rows = grid.map((row, rowIndex) => {
      const cols = row.map((col, colIndex) => (
        <Cell
          value={this.isCellHasSnake(rowIndex, colIndex)}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ));
      return <div className="grid-line">{cols}</div>;
    });

    if (gameState === 'play') {
      return (
        <div
          className="grid"
          ref={grid => (this.grid = grid)}
          tabIndex="-1"
          onKeyDown={this.onKeyPress.bind(this)}
        >
          {rows}
        </div>
      );
    }
    return (
      <div>
        <div>Game Over</div>
        <div>You ate {foodEaten} apples</div>
        <div>
          <button onClick={this.restart.bind(this)}>Restart</button>
        </div>
      </div>
    );
  }
}
