import React, { Component } from 'react';
import Cell from './Cell';
import { directionOfKeyPressed, getRandomFoodPosition } from '../utils/Game';
import { getNewSnakeHead, isEatingHimself, isEatingWall } from '../utils/Snake';
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
    this.intervalId = setInterval(() => {
      this.moveSnake(this.state.direction);
    }, 300);
  }

  onKeyPress({ key }) {
    const direction = directionOfKeyPressed(key);
    this.setState({ direction });
  }

  moveSnake(direction) {
    this.setState(prevState => ({
      snakePosition: getNewSnakeHead(direction, prevState.snakePosition).slice(
        prevState.snakeSize === prevState.snakePosition.length ? 1 : 0
      ),
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
    this.setState(isEatingHimself);
    this.setState(isEatingWall);
  }

  showFood() {
    this.setState({
      foodPosition: getRandomFoodPosition(this.state.snakePosition),
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
    clearInterval(this.intervalId);
    this.setState(DEFAULT_STATE);
    this.showFood();
    this.grid.focus();
    this.gameStart();
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
          key={`${colIndex}`}
        />
      ));
      return (
        <div className="grid-line" key={`${rowIndex}`}>
          {cols}
        </div>
      );
    });

    return (
      <div>
        <div
          className="grid"
          ref={grid => (this.grid = grid)}
          tabIndex="-1"
          onKeyDown={this.onKeyPress.bind(this)}
        >
          {gameState === 'play' && rows}
        </div>
        {gameState === 'end' && <div>Game Over</div>}
        <div>You ate {foodEaten} apples</div>
        <div>
          <button onClick={this.restart.bind(this)}>Restart</button>
        </div>
      </div>
    );
  }
}
