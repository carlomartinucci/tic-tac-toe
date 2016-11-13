import React, { Component } from 'react';
import Game from './Game.js'


class App extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <Game />
      </div>
    )
  }
}

export default App;
