import React from 'react';
import './App.css';
import Navbar from './components/header/nav';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Closet from './pages/closet';
import Home from './pages/home';
import About from './pages/about'
import { useMediaQuery } from '@material-ui/core';
import {
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';



function App(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: props.darkmode ? 'dark' : 'light',
          primary: props.darkmode ? red : blue,
        },
      }),
    [prefersDarkMode,props.darkmode],
  );
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          <Navbar />
          <div>
            <div>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/closet">
                  <Closet />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
    </ThemeProvider>
  );
}

export default connect(state => state)(App);