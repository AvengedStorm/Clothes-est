import React from 'react';
// import {useSelector} from 'react-redux'

import './App.css';

import Navbar from './components/header/nav';

import CssBaseline from '@material-ui/core/CssBaseline';

import Closet from './pages/closet';
import Home from './pages/home';
import About from './pages/about'
import {
  Switch,
  Route
} from "react-router-dom";

import Login from './pages/login';

function App(props) {
  // const user = useSelector(state => state.currentUser);
  
  return (
    <div>
      <CssBaseline />
      <Navbar />
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
  );
}

export default App;