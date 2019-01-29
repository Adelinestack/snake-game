import React, { Component } from 'react';
import Grid from './Grid';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>SnAkE</h1>
        </header>
        <main>
          <Grid grid={this.state.grid} />
        </main>
      </div>
    );
  }
}
