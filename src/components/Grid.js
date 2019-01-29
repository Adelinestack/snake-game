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

  isCellHasSnake(rowIndex, colIndex) {
    if (
      this.state.snakePosition[0] === rowIndex &&
      this.state.snakePosition[1] === colIndex
    ) {
      return <div className="snake" />;
    }
    return <div className="cell" />;
  }

  moveSnake() {
    this.setState({
      snakePosition: [
        this.state.snakePosition[0],
        this.state.snakePosition[1] + 1,
      ],
    });
  }

  gameStart() {
    setInterval(() => {
      this.moveSnake();
    }, 300);
  }

  componentDidMount() {
    this.grid.focus();
    this.gameStart();
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
      <div className="grid" ref={grid => (this.grid = grid)} tabIndex="-1">
        {rows}
      </div>
    );
  }
}
