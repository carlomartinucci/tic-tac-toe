import React, { Component } from 'react';
import {calculateCoordinate} from './helper.js'
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';

class MovesList extends Component {
  render(){
    const moves = this.props.history.map((step, move) => {
      const desc = move ? `Move # ${move} (${ (move % 2) ? 'X' : 'O' } in ${calculateCoordinate(step.clicked)})` : `Game ${this.props.gId} start`;
      return (
      <ListItem
        key={move}
        primaryText={desc}
        onClick={() => this.props.onClick(move)}
        disabled={move === this.props.stepNumber}
        rightIcon={move === this.props.stepNumber ? <ActionGrade/> : null}
      />
      );
    });
    return (
      <List reversed={this.props.reversed}>{this.props.reversed ? moves.reverse() : moves}</List>
    )
  }
}

MovesList.defaultProps = {
  history: [{
    squares: Array(9).fill(null),
    clicked: null
  }],
  stepNumber: 0,
  reversed: false,
  gId: 0
}

MovesList.propTypes = {
  history: React.PropTypes.arrayOf(React.PropTypes.object),
  stepNumber: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
  reversed: React.PropTypes.bool,
  gId: React.PropTypes.number
}

export default MovesList