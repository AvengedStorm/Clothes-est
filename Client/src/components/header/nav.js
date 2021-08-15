import React from 'react';
import {
    BrowserRouter as Router  } from "react-router-dom";

const NavBar = (props) => {
    return (
        <Router>
            <div id="navbar" className="navBar">
                <h1>Clothes-est!</h1>
                <ul>
                    <a href="/#" onClick={() => props.updateFunction('/closet')}><li className="navItem">Closet</li></a>
                    <a href="/" onClick={() => props.updateFunction('/home')}><li className="navItem">Home</li></a>
                    <a href="/#" onClick={() => props.updateFunction('/about')}><li className="navItem">About</li></a>
                </ul>
                <br />
            </div>
        </Router>
    )
}

export default NavBar;