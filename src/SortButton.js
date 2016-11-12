import React from 'react';

const SortButton = (props) => (
  <button className="toggle" onClick={() => props.onClick()}>
    {props.value}
  </button>
)

SortButton.defaultProps = {
  value: "Ascending"
}

SortButton.propTypes = {
  value: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

export default SortButton