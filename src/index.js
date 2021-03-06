import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core';
import 'typeface-inter';

import App from './App';
import theme from './theme';

ReactGA.initialize('UA-101860681-12');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
