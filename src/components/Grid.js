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
    this.setState(prevState => {
      return {
        snakePosition: this.getNewSnakeHead(
          direction,
          prevState.snakePosition
        ).slice(1),
      };
    });
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
