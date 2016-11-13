import React, { Component } from 'react';
import {calculateWinner} from './helper.js'
import MovesList from './MovesList.js'
import SortButton from './SortButton.js'
import Board from './Board.js'

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const scoreStyle = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  lineHeight: '100px',
  fontSize: 40
};
const Score = (props) =>
  <div>
    <Paper circle={true} style={scoreStyle} className={"score " + (props.next === "X" ? "isNext" : "") + (props.winner === "X" ? " win" : "")}>
      X {props.valueX}
    </Paper>
    <Paper circle={true} style={scoreStyle} className={"score " + (props.next === "O" ? "isNext" : "") + (props.winner === "O" ? " win" : "")}>
      O {props.valueO}
    </Paper>
  </div>

const NewGame = (props) => 
  <RaisedButton
    onClick={props.onClick}
    label={props.ended ? 'New Game' : 'Reset Game'}
    primary={true}
    fullWidth={true}
  />

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gId: 0,
      history: [{
        squares: Array(9).fill(null),
        clicked: null
      }],
      xIsNext: true,
      stepNumber: 0,
      listIsDescending: false,
      winner: null,
      scores: []
    };
    this.resetState = this.resetState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleListClick = this.toggleListClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }
  resetState() {
    const gId = this.state.winner ? this.state.gId +1 : this.state.gId;
    this.setState({
      gId: gId,
      history: [{
        squares: Array(9).fill(null),
        clicked: null
      }],
      xIsNext: true,
      stepNumber: 0,
      winner: null
    })
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
  handleIfWin(squares) {
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winner: winner
      })
      this.handleScore(this.state.gId);
      let scores = this.state.scores.slice();
      this.setState({
        scores: scores.concat([winner.winner])
      });
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        clicked: i
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
    this.handleIfWin(squares);
  }
  toggleListClick(){
    this.setState({
      listIsDescending: !this.state.listIsDescending
    });
  }
  jumpTo(step) {
    this.handleScore(this.state.gId);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
    const history = this.state.history.slice(0,step + 1);
    const current = history[step];
    const squares = current.squares.slice();
    this.handleIfWin(squares);
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    const scoreX = this.state.scores.filter((X) => X === "X").length
    const scoreO = this.state.scores.filter((O) => O === "O").length
    
    return (
      <div className="game">
        <Score valueX={scoreX} valueO={scoreO} next={winner ? null : (this.state.xIsNext ? "X" : "O")} winner={winner ? winner.winner : null} />
        <Board squares={current.squares}
          onClick={this.handleClick}
          winners={winner ? winner.squares : []} />
        <NewGame
          ended={!!this.state.winner || !current.squares.includes(null)}
          onClick={this.resetState}
        />
        <Paper className="moves-list">
          <SortButton onClick={this.toggleListClick} value={this.state.listIsDescending ? "Descending" : "Ascending"} />
          <MovesList
            gId={this.state.gId}
            onClick={this.jumpTo}
            reversed={this.state.listIsDescending}
            history={this.state.history}
            stepNumber={this.state.stepNumber} />
        </Paper>
      </div>
    );
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

NewGame.defaultProps = {
  ended: true,
}

NewGame.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  ended: React.PropTypes.bool,
}

export default Game
