import React, { Component } from 'react';
import {calculateCoordinate, calculateWinner} from './helper.js'
import Board from './Board.js'

const SortButton = (props) => (
  <button className="toggle" onClick={() => props.onClick()}>
    {props.value}
  </button>
)

class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9),
        clicked: null
      }],
      xIsNext: true,
      stepNumber: 0,
      listIsDescending: false
    };
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
  }
  toggleListClick(){
    this.setState({
      listIsDescending: !this.state.listIsDescending
    });
  }
  jumpTo(step) {
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
    
    const moves = history.map((step, move) => {
      const desc = move ? `Move # ${move} (${ (move % 2) ? 'X' : 'O' } in ${calculateCoordinate(step.clicked)})` : `Game start`;
      return (
      <li key={move}>
          { move !== this.state.stepNumber ? 
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
           : <b>{desc}</b> }
      </li>
      );
    });
    
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            status={status}
            winners={winner ? winner.squares : []} />
        </div>
        <div className="game-info">
          <SortButton onClick={() => this.toggleListClick()} value={this.state.listIsDescending ? "Descending" : "Ascending"} />
          <ol reversed={this.state.listIsDescending}>{this.state.listIsDescending ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
