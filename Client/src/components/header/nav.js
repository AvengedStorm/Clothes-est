import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';

import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import DarkModeIcon from '@material-ui/icons/Brightness2TwoTone';
import LightModeIcon from '@material-ui/icons/BrightnessHighTwoTone';

import './nav.css';

let drawerWidth = "240px";
const NavBar = (props) => {
  const currentUser = useSelector(state => state.currentUser);
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const darkmode = useSelector(state => state.darkmode);
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
  const classes = useStyles();

  return (
          <div className={classes.root}>
          <AppBar position="fixed" style={{top: "0px"}} color="primary">
              <Toolbar>
                  <IconButton edge="start" onClick={() => toggleDrawer(true)} onMouseOver={() => toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
              <Typography variant="h6" className={classes.title}>
                  Cloth-est!
              </Typography>
              <IconButton className={classes.titleItemRight} color="inherit" aria-label="Style Toggle" onClick={() => props.dispatch({type: 'togglestyle'})}>
                  {darkmode ? <LightModeIcon/> : <DarkModeIcon/>}
              </IconButton>
              </Toolbar>
          </AppBar>
          <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          anchor="left" 
          open={isDrawerOpen} 
          onClose={() => toggleDrawer(false)}
          >
              <div className="drawerButton">
                      <div className="App" style={{ width: drawerWidth }}>
                          <Link to="/"><Button onClick={() => toggleDrawer(false)}>Home</Button></Link>
                          <Link to="/closet"><Button onClick={() => toggleDrawer(false)}>Closet</Button></Link>
                          <Link to="/about"><Button onClick={() => toggleDrawer(false)}>About</Button></Link>
                          <Link to="/login"><Button onClick={() => toggleDrawer(false)}>{currentUser ? "Logout" : "Login"}</Button></Link>
                      </div>
              </div>            
              <Button onClick={() => toggleDrawer(false)}>Close</Button>
          </Drawer>
      </div>        
  )
};

const mapperFunction = (state) => {
  return {darkmode: state.darkmode};
};
export default connect(mapperFunction)(NavBar);