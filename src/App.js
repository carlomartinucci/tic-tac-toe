import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Game from './Game.js'

const Score = (props) => <div className="score">Score: X {props.valueX} - {props.valueO} O</div>

class App extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }
  }
  onWin(winner, gId) {
    const scores = this.state.scores.slice()
    this.setState({
      scores: scores.concat([winner.winner])
    });
  }
  render() {
    const scoreX = this.state.scores.filter((X) => X === "X").length
    const scoreO = this.state.scores.filter((O) => O === "O").length
    return (
      <div>
        <Score valueX={scoreX} valueO={scoreO} />
        <Game gId={this.state.gId} onWin={(winner, gId) => this.onWin(winner, gId)}/>
      </div>
    )
  }
}

export default App;
