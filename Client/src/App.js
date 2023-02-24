import React from 'react';

import './App.css';

import Navbar from './components/header/nav';

import CssBaseline from '@material-ui/core/CssBaseline';

import Closet from './pages/closet';
import Home from './pages/home';
import About from './pages/about';
import Carousel from './components/Carousel/Carousel.js';

import {
  Switch,
  Route
} from "react-router-dom";

import Login from './pages/login';

function App(props) {
  
  return (
    <div>
      <CssBaseline />
      {window.location.pathname !== '/login' ? <Navbar /> : <></>}
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
      {window.location.pathname !== '/login' ? <Carousel /> : <></>}
    </div>
  );
}

export default App;