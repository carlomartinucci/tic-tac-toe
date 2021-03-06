// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const themedApp = 
  <MuiThemeProvider>
    <Game />
  </MuiThemeProvider>

ReactDOM.render(
  themedApp,
  document.getElementById('root')
);
