import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import React, { useState } from 'react';

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

import './nav.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


const NavBar = (props) => {
    const [isDrawerOpen, toggleDrawer] = useState(false);

    const classes = useStyles();

    return (
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={() => toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Clothes-est!
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                <div className="drawerButton">
                        <div className="App">
                            <Link to="/"><button type="button" class="btn btn-primary">Home</button></Link>
                            <Link to="/closet"><button type="button" class="btn btn-primary">Closet</button></Link>
                            <Link to="/about"><button type="button" class="btn btn-primary">About</button></Link>
                        </div>
                </div>            
                <Button onClick={() => toggleDrawer(false)}>Close</Button>
            </Drawer>
        </div>        
    )
}

export default NavBar;