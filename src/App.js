import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {increasing: false};
  }
  update(){
    ReactDOM.render(
      <App val={this.props.val +1} />,
      document.getElementById('root')
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({increasing: nextProps.val > this.props.val})
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val % 3 === 0
  }
  render() {
    console.log(this.state.increasing)
    return <button onClick={this.update}>{this.props.val}</button>
  }
}

App.defaultProps = { val: 0 }
export default App;
