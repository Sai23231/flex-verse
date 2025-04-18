import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSignIn } from 'react-auth-kit';
import { useDispatch } from 'react-redux';

import { setLoggedInUserDetails } from '../../features/userDetailsSlice';
import { authApi } from '../API/AuthApi';
import { forSignUp } from '../assets';
import { useNotification } from '../context/NotificationProvider';

const StyledTextField = (props: any) => (
  <TextField
    variant="filled"
    fullWidth
    margin="normal"
    {...props}
    sx={{ backgroundColor: 'white' }}
  />
);

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { showNotification } = useNotification();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/signup');
  };
  const submit = () => {
    authApi
      .login(username, password)
      .then((response) => {
        signIn({
          token: response.accessToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { username: username, role: 'CONSULTANT' },
        });
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        dispatch(setLoggedInUserDetails(response));
        navigate('/');
      })
      .catch((error) => {
        showNotification(true, 'success', 'SignUp Error', error.response.data);
      });
  };

  const submitUserDataFromGoogleAccount = (idToken: string) => {
    authApi
      .googleLogin(idToken)
      .then((response) => {
        signIn({
          token: response.accessToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { username: response.firstName },
        });
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        dispatch(setLoggedInUserDetails(response));
        navigate('/');
      })
      .catch((error) => {
        showNotification(
          true,
          'error',
          'Login Error',
          error.response?.data || 'Unknown error'
        );
      });
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '',
          callback: (response: { credential: string }) => {
            submitUserDataFromGoogleAccount(response.credential);
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large' }
        );
      } else {
        console.error('Google API not loaded yet');
      }
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="80vh"
      sx={{
        backgroundImage: `linear-gradient(rgba(72, 156, 242, 0.8), rgba(0, 0, 0, 0.8)), url(${forSignUp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '30px',
            lineHeight: '66.8px',
            width: '250px',
            color: 'white',
          }}
        >
          Sign In
        </Typography>
        <StyledTextField
          label="Email"
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
          onClick={submit}
        >
          Sign In
        </Button>
        <Typography
          variant="body2"
          sx={{
            margin: '10px 0',
            lineHeight: '66.8px',
            width: '250px',
            color: 'white',
          }}
        >
          Don't have an account?{' '}
          <Button
            variant="text"
            color="inherit"
            sx={{ textTransform: 'none', padding: 0, fontWeight: 'bold' }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Typography>
        <div id="google-signin-button"></div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
