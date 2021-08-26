import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { Drawer } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Closet from "../../pages/closet";
import Home from "../../pages/home";
import About from "../../pages/about";

import './nav.css';

const NavBar = (props) => {
    const [isDrawerOpen, toggleDrawer] = useState(false);

    return (
        <div>
            <IconButton id="menu" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                <div className="drawerButton">
                        <button type="button" class="btn btn-outline-primary">Home</button>
                        <button type="button" class="btn btn-outline-primary">Closet</button>
                        <button type="button" class="btn btn-outline-primary">About</button>
                </div>            
                <Button onClick={() => toggleDrawer(false)}>Close Doors</Button>
            </Drawer>
        </div>        
    )
}

export default NavBar;

{/* <a href="/" onClick={() => props.updateFunction('/home')}><li className="navItem">Home</li></a>
                  <a href="/#" onClick={() => props.updateFunction('/closet')}><li className="navItem">Closet</li></a>
                  <a href="/#" onClick={() => props.updateFunction('/about')}><li className="navItem">About</li></a> */}

// return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>
// 
// {/* <hr /> */}
// 
//         {/*
//           A <Switch> looks through all its children <Route>
//           elements and renders the first one whose path
//           matches the current URL. Use a <Switch> any time
//           you have multiple routes, but you want only one
//           of them to render at a time
//         */}
        // <Switch>
        //   <Route exact path="/">
        //     <Home />
        //   </Route>
        //   <Route path="/about">
        //     <About />
        //   </Route>
        //   <Route path="/dashboard">
        //     <Dashboard />
        //   </Route>
        // </Switch>
//       </div>
//     </Router>
//   );
{/* <Router>
            <div id="navbar" className="navBar">
                <h1 className="title">Clothes-est!</h1>
                <br />
                <ul className="navList">
                    <li>
                        <Link to="../pages/home">Home</Link>
                    </li>
                    <li>
                        <Link to="../pages/closet">Closet</Link>
                    </li>
                    <li>
                        <Link to="../pages/about">About</Link>
                    </li>
                </ul>
                <br />
                <Switch>
                    <Route exact path="../pages/home">
                        <Home />
                    </Route>
                    <Route path="../pages/closet">
                        <Closet />
                    </Route>
                    <Route path="../pages/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        </Router> */}