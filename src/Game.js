import React, { Component } from 'react';
import {calculateWinner} from './helper.js'
import MovesList from './MovesList.js'
import SortButton from './SortButton.js'
import Board from './Board.js'
import RaisedButton from 'material-ui/RaisedButton';

const NewGame = (props) => <RaisedButton onClick={props.onClick} label={props.ended ? 'New Game' : 'Reset Game'} />

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
      winner: null
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
  handleIfWin(squares) {
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winner: winner
      })
      this.props.onWin(winner, this.state.gId);
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
    this.props.handleScore(this.state.gId);
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
    
    
    return (
      <div className="game">
        <NewGame
          ended={!!this.state.winner || !current.squares.includes(null)}
          onClick={this.resetState}/>
        <div className="game-board">
          <Board squares={current.squares}
            onClick={this.handleClick}
            status={status}
            winners={winner ? winner.squares : []} />
        </div>
        <div className="game-info">
          <SortButton onClick={this.toggleListClick} value={this.state.listIsDescending ? "Descending" : "Ascending"} />
          <MovesList
            gId={this.state.gId}
            onClick={this.jumpTo}
            reversed={this.state.listIsDescending}
            history={this.state.history}
            stepNumber={this.state.stepNumber} />
        </div>
      </div>
    );
  }
}

NewGame.defaultProps = {
  ended: true,
}

NewGame.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  ended: React.PropTypes.bool,
}

Game.propTypes = {
  onWin: React.PropTypes.func.isRequired,
  handleScore: React.PropTypes.func.isRequired
}

export default Game
