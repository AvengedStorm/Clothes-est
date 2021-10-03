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

import cyan from '@material-ui/core/colors/cyan';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Login from './pages/login';

function App(props) {
  // if(window.location.pathname != '/login' && !props.currentUser) {
  //   window.location = '/login';
  // }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: props.darkmode ? 'dark' : 'light',
          primary: props.darkmode ? blueGrey : cyan,
        },
      }),
    [prefersDarkMode,props.darkmode],
  );
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <div id="app-div">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/closet">
              <Closet />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
    </ThemeProvider>
  );
}

export default App;