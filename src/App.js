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

  handleScore = (gId) => {
    let scores = this.state.scores.slice();
    if (scores.length > gId) {
      scores.pop();
      this.setState({
        scores: scores
      });
    }
  }
  handleWin = (winner, gId) => {
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
        <Game gId={this.state.gId} handleScore={this.handleScore} onWin={this.handleWin}/>
      </div>
    )
  }
}

Score.defaultProps = {
  valueX: 0,
  valueO: 0
}

Score.propTypes = {
  valueX: React.PropTypes.number,
  valueO: React.PropTypes.number
}

export default App;
