import React, { Component } from 'react';
import {calculateCoordinate} from './helper.js'

class MovesList extends Component {
  render(){
    const moves = this.props.history.map((step, move) => {
      const desc = move ? `Move # ${move} (${ (move % 2) ? 'X' : 'O' } in ${calculateCoordinate(step.clicked)})` : `Game ${this.props.gId} start`;
      return (
      <li key={move}>
          { move !== this.props.stepNumber ? 
          <a href="#" onClick={() => this.props.onClick(move)}>{desc}</a>
           : <b>{desc}</b> }
      </li>
      );
    });
    return (
      <ol reversed={this.props.reversed}>{this.props.reversed ? moves.reverse() : moves}</ol>
    )
  }
}

export default MovesList