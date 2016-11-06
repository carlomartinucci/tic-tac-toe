import React, { Component } from 'react';
import {calculateWinner} from './helper.js'
import MovesList from './MovesList.js'
import SortButton from './SortButton.js'
import Board from './Board.js'

const NewGame = (props) => (
  <button onClick={() => props.onClick()}>
    { props.ended ? 'New' : 'Reset'} Game
  </button>
)

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
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState({
        winner: winner
      })
      this.props.onWin(winner, this.state.gId);
    }
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
          onClick={() => this.resetState()}/>
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            status={status}
            winners={winner ? winner.squares : []} />
        </div>
        <div className="game-info">
          <SortButton onClick={() => this.toggleListClick()} value={this.state.listIsDescending ? "Descending" : "Ascending"} />
          <MovesList
            gId={this.state.gId}
            onClick={(move) => this.jumpTo(move)}
            reversed={this.state.listIsDescending}
            history={this.state.history}
            stepNumber={this.state.stepNumber} />
        </div>
      </div>
    );
  }
}

export default Game
