import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import DarkModeIcon from '@material-ui/icons/Brightness2TwoTone';
import LightModeIcon from '@material-ui/icons/BrightnessHighTwoTone';

import './nav.css';

let drawerWidth = 240;
const NavBar = (props) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
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
                  <IconButton edge="start" onClick={() => toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
              <Typography variant="h6" className={classes.title}>
                  Cloth-est!
              </Typography>
              <IconButton className={classes.titleItemRight} color="inherit" aria-label="Style Toggle" onClick={() => props.dispatch({type: 'togglestyle'})}>
                  {props.darkmode ? <LightModeIcon/> : <DarkModeIcon/>}
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
          anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
              <div className="drawerButton">
                      <div className="App">
                          <Link to="/"><button type="button" className="btn btn-primary" onClick={() => toggleDrawer(false)}>Home</button></Link>
                          <Link to="/closet"><button type="button" className="btn btn-primary" onClick={() => toggleDrawer(false)}>Closet</button></Link>
                          <Link to="/about"><button type="button" className="btn btn-primary" onClick={() => toggleDrawer(false)}>About</button></Link>
                          <Link to="/login"><button type="button" className="btn btn-primary" onClick={() => toggleDrawer(false)}>Login</button></Link>
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