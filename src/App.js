import React, { Component } from 'react';
import Game from './Game.js'

const Score = (props) => <div className="score">Score: X {props.valueX} - {props.valueO} O</div>

class App extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }
  }
  handleScore(gId) {
    let scores = this.state.scores.slice();
    if (scores.length > gId) {
      scores.pop();
      this.setState({
        scores: scores
      });
    }
  }
  handleWin(winner, gId) {
    this.handleScore(gId);
    let scores = this.state.scores.slice();
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
        <Game gId={this.state.gId} handleScore={(gId) => this.handleScore(gId)} onWin={(winner, gId) => this.handleWin(winner, gId)}/>
      </div>
    )
  }
}

export default App;
