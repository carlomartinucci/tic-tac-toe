import React, { Component } from 'react';


const Square = (props) => (
  <button className={props.winner ? 'square win' : 'square'} onClick={() => props.onClick()}>
    {props.value}
  </button>
)

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
        <div className="board">
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

Square.defaultProps = {
  winner: false,
  value: null
}

Square.propTypes = {
  winner: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
}

Board.defaultProps = {
  winners: [],
  squares: Array(9).fill(null),
  status: "Next Player: X"
}

Board.propTypes = {
  winners: React.PropTypes.arrayOf(React.PropTypes.number),
  squares: React.PropTypes.arrayOf(React.PropTypes.string),
  onClick: React.PropTypes.func.isRequired,
  status: React.PropTypes.string
}

export default Board