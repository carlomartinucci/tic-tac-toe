import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SortButton = (props) => (
  <RaisedButton onClick={() => props.onClick()} label={props.value} fullWidth={true} secondary={true} />
)

SortButton.defaultProps = {
  value: "Ascending"
}

SortButton.propTypes = {
  value: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

export default SortButton