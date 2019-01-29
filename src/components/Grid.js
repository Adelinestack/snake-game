import React, { Component } from 'react';
import Cell from './Cell';
import './grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = null;
    this.state = {
      direction: 'right',
      snakePosition: [[0, 0], [0, 1], [0, 2]],
      foodPosition: [0, 0],
    };
  }

  componentDidMount() {
    this.grid.focus();
    this.gameStart();
  }

  gameStart() {
    setInterval(() => {
      this.moveSnake(this.state.direction);
    }, 1000);
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

  moveSnake(direction) {
    const [snakeQueue, ...snake] = this.state.snakePosition;

    if (direction === 'right') {
      this.setState({
        snakePosition: [
          ...snake,
          [snake[snake.length - 1][0], snake[snake.length - 1][1] + 1],
        ],
      });
    } else if (direction === 'left') {
      this.setState({
        snakePosition: [
          ...snake,
          [snake[snake.length - 1][0], snake[snake.length - 1][1] - 1],
        ],
      });
    } else if (direction === 'up') {
      this.setState({
        snakePosition: [
          ...snake,
          [snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]],
        ],
      });
    } else if (direction === 'down') {
      this.setState({
        snakePosition: [
          ...snake,
          [snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]],
        ],
      });
    }
  }

  isCellHasSnake(rowIndex, colIndex) {
    const isSnake = this.state.snakePosition.find(
      position => position[1] === colIndex && position[0] === rowIndex
    );
    if (isSnake) {
      return 'snake';
    }
    return 'cell';
  }

  render() {
    const { grid } = this.props;
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
}
