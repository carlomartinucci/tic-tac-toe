import React from 'react';

const SortButton = (props) => (
  <button className="toggle" onClick={() => props.onClick()}>
    {props.value}
  </button>
)

export default SortButton