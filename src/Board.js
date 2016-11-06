import React, { Component } from 'react';

function Square(props) {
   return (
    <button className={props.winner ? 'square win' : 'square'} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return <Square key={i} winner={this.props.winners.includes(i)} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  
  renderRows() {
    return [0,1,2].map(i => 
      <div className="board-row" key={i}>
        {[0,1,2].map(j => this.renderSquare(3*i + j))}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="status">{this.props.status}</div>
        {this.renderRows()}
      </div>
    );
  }
}

export default Board