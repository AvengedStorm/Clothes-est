import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import './nav.css';

const pathnames = ['/login', '/about']
let drawerWidth = "240px";
const NavBar = (props) => {
  const dispatch = useDispatch();
  const belongsTo = useSelector(state => state.belongsTo);
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

  const localCurrentUser = localStorage.getItem('loginState')

  if(localCurrentUser === null && pathnames.indexOf(window.location.pathname) === -1) {
      window.location = '/login';
  }

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
              {localCurrentUser ?
                <IconButton className={classes.titleItemRight} color="inherit" aria-label="Style Toggle" onClick={() => {localStorage.removeItem('loginState'); dispatch({type: 'logout'})}} >
                  <LogoutRoundedIcon />
                </IconButton>
                :
                <IconButton className={classes.titleItemRight} color="inherit" aria-label="Style Toggle" onClick={() => window.location = '/login'}>
                  <LoginRoundedIcon />
                </IconButton>}
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
                <div className="App" style={{ width: drawerWidth }} onMouseLeave={() => toggleDrawer(false)}>
                  <Link to="/"><Button onClick={() => toggleDrawer(false)}>Home</Button></Link>
                  <Link to="/closet"><Button onClick={() => toggleDrawer(false)}>Closet</Button></Link>
                  <Link to="/about"><Button onClick={() => toggleDrawer(false)}>About</Button></Link>
                  <Link to="/login"><Button color="secondary" onClick={() => {
                    toggleDrawer(false);
                    if(localCurrentUser || belongsTo) {
                      dispatch({type: "logout"});
                      localStorage.removeItem('loginState');
                    }
                    }}>{localCurrentUser ? "Logout" : "Login"}</Button></Link>
                </div>
              </div>
          </Drawer>
      </div>        
  )
};

const mapperFunction = (state) => {
  return {darkmode: state.darkmode};
};
export default connect(mapperFunction)(NavBar);