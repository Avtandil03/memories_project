import React, { useState } from "react";
import { Typography, Avatar, Button, Grid, Paper, Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAuth from "./InputAuth";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate  } from 'react-router-dom'

const Auth = () => {
  
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId:
        "383105861250-6m30nmqegkce2fskkr4ims7g9bgtbsnl.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  const dispatch = useDispatch()
  const classes = useStyles();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async(res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({type: 'AUTH', data: {result, token}})
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const googleError = (error) => {
    error && console.log(error);
    console.log('google sign in unsuccessful')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sing Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <InputAuth
                  name="firstName"
                  label="Firs Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <InputAuth
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <InputAuth
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <InputAuth
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <InputAuth
                name="confirmPassword"
                label="Repeat Password"
                hondleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="383105861250-6m30nmqegkce2fskkr4ims7g9bgtbsnl.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon/>}
                variant='contained'
              > Google Sign In</Button>
            )}           
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent="flex-end">  
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
