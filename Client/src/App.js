import React from 'react';
import './App.css';
import Navbar from './components/header/nav';

import Closet from './pages/closet';
import Home from './pages/home';
import About from './pages/about'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;