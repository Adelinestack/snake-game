import React, { Component } from 'react';

import './grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = null;
    this.state = {
      direction: 'right',
      snakePosition: [0, 0],
    };
  }

  componentDidMount() {
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

  moveSnake(direction) {
    if (direction === 'right') {
      this.setState({
        snakePosition: [
          this.state.snakePosition[0],
          this.state.snakePosition[1] + 1,
        ],
      });
    } else if (direction === 'left') {
      this.setState({
        snakePosition: [
          this.state.snakePosition[0],
          this.state.snakePosition[1] - 1,
        ],
      });
    } else if (direction === 'up') {
      this.setState({
        snakePosition: [
          this.state.snakePosition[0] - 1,
          this.state.snakePosition[1],
        ],
      });
    } else if (direction === 'down') {
      this.setState({
        snakePosition: [
          this.state.snakePosition[0] + 1,
          this.state.snakePosition[1],
        ],
      });
    }
  }

  isCellHasSnake(rowIndex, colIndex) {
    if (
      this.state.snakePosition[0] === rowIndex &&
      this.state.snakePosition[1] === colIndex
    ) {
      return <div className="snake" />;
    }
    return <div className="cell" />;
  }

  render() {
    const { grid } = this.props;
    const rows = grid.map((row, rowIndex) => {
      const cols = row.map((col, colIndex) =>
        this.isCellHasSnake(rowIndex, colIndex)
      );
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
