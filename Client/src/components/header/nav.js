import React, {useState} from 'react';
import {
    BrowserRouter as Router  } from "react-router-dom";
import './nav.css';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const SimpleMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const NavBar = (props) => {
    return (
        <Router>
            <div id="navbar" className="navBar">
                <h1 className="title"><a href="#"><MenuIcon onClick={SimpleMenu.handleClick} classname="menuIcon"/></a>Clothes-est!</h1>
                <br />
                <ul className="navList">
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