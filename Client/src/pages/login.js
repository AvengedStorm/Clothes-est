import React, { useState } from 'react';
import fetcher from '../components/db/fetcher';
import md5 from "md5";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://clothest.com/">
        Clothest
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  
  // const localCurrentUser = localStorage.getItem('loginState')

  const handleErrorOpen = () => setError(true);
  const handleErrorClose = () => setError(false);

  const hashedUserData = md5(`${email}${password}`)
  const userData = { email, password, hashedUserData };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const useStyles3 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const classes3 = useStyles3();
  const SignUpForm = () => {
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [firstNameField, setFirstNameField] = useState("");
    const [lastNameField, setLastNameField] = useState("");
    const [passwordVerificationField, setPasswordVerificationField] = useState("");
    const [display, setDisplay] = useState("none");
    const hashedData = md5(`${emailField}${passwordField}`)
    const userFieldData = {
      firstName: firstNameField,
      lastName: lastNameField,
      email: emailField,
      password: passwordField,
      hashedData
    };
    const handleUserPost = () => {
      fetcher.postUser(userData);
    }
    return (
      <div>
        <form className={classes3.root} onSubmit={handleUserPost}>
          <label>First Name:</label>
          <br />
          <input type="text" onChange={(e) => setFirstNameField(e.target.value)} placeholder="Enter your first name" required />
          <br />
          <label>Last Name:</label>
          <br />
          <input type="text" onChange={(e) => setLastNameField(e.target.value)} placeholder="Enter your last name" required />
          <br />
          <label>Email:</label>
          <br />
          <input type="email" onChange={(e) => setEmailField(e.target.value)} placeholder="Enter your email" required />
          <br />
          <label>Password:</label>
          <br />
          <input type="password" onChange={(e) => setPasswordField(e.target.value)} placeholder="Enter a password" required />
          <br />
          <label>Password verification:</label>
          <br />
          <input type="password" onChange={(e) => setPasswordVerificationField(e.target.value)} placeholder="Verify your password" required />
          <br />
          <label style={{display: display, color: "red", fontSize: "0.75rem"}}>You have to confirm your password</label>
          <br />
          <Button
          fullWidth 
          color="secondary" 
          style={{width: "340px", marginLeft: "auto", marginRight: "auto"}}
          onClick={(e) => {
            if(passwordVerificationField === passwordField) {
              fetcher.postUser(userFieldData);
              setOpen(false);
            } else {
              setDisplay(true)
            }
          }}>
            sign up
          </Button>
        </form>
      </div>
    )
  };
  const Signup = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: 'center'}} >LET US START</DialogTitle>
        <DialogContent>
          <SignUpForm />
        </DialogContent>
      </Dialog>
    )
  };
  const UserFoundDialog = () => {
    return (
      <Dialog open={error} style={{textAlign: 'center'}} onClose={handleErrorClose}>
        <DialogTitle>Error!</DialogTitle>
        <DialogContent>A user containing this email does not exist.</DialogContent>
      </Dialog>
    )
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField 
              variant="outlined" 
              margin="normal" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              fullWidth 
              id="email" 
              label="Email Address" 
              name="email" 
              autoComplete="email" 
              autoFocus
            />
            <TextField 
              variant="outlined" 
              margin="normal" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              fullWidth 
              name="password" 
              label="Password" 
              type="password" 
              id="password" 
              autoComplete="current-password" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                value="remember" 
                color="primary" 
                />} 
              label="Remember me" 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                fetcher.loginUser(userData, data => {
                  if(data.message === "User Verified.") {
                    localStorage.setItem('loginState', data.userData);
                    window.location.pathname = '/home';
                  }
                  if(data.message === "User Not Found.") {
                    handleErrorOpen();
                  }
                });
            }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button href="#">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button href="#" onClick={handleOpen}>
                  Don't have an account? Sign Up!
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        <Signup />
      </Grid>
      <UserFoundDialog />
    </Grid>
  );
}

export default Login;