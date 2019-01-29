import React, { Component } from 'react';

import './grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { grid } = this.props;
    const lines = grid.map(line => {
      const cells = line.map(cell => <div className="cell" />);
      return <div className="grid-line">{cells}</div>;
    });

    return <div className="Grid">{lines}</div>;
  }
}
