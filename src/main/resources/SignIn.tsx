// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { Button, Grid, TextField, Typography } from '@mui/material';
// import { useSignIn } from 'react-auth-kit';
// import { useDispatch } from 'react-redux';

// import { setLoggedInUserDetails } from '../../features/userDetailsSlice';
// import { authApi } from '../API/AuthApi';
// import { forSignUp } from '../assets';
// import { useNotification } from '../context/NotificationProvider';

// const StyledTextField = (props: any) => (
//   <TextField
//     variant="filled"
//     fullWidth
//     margin="normal"
//     {...props}
//     sx={{ backgroundColor: 'white' }}
//   />
// );

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const { showNotification } = useNotification();
//   const signIn = useSignIn();
//   const navigate = useNavigate();
//   const handleSignUp = () => {
//     navigate('/signup');
//   };
//   const submit = () => {
//     authApi
//       .login(username, password)
//       .then((response) => {
//         signIn({
//           token: response.accessToken,
//           expiresIn: 3600,
//           tokenType: 'Bearer',
//           authState: { username: username, role: 'CONSULTANT' },
//         });
//         localStorage.setItem('loggedInUser', JSON.stringify(response));
//         dispatch(setLoggedInUserDetails(response));
//         navigate('/');
//       })
//       .catch((error) => {
//         showNotification(true, 'success', 'SignUp Error', error.response.data);
//       });
//   };

//   const submitUserDataFromGoogleAccount = (idToken: string) => {
//     authApi
//       .googleLogin(idToken)
//       .then((response) => {
//         signIn({
//           token: response.accessToken,
//           expiresIn: 3600,
//           tokenType: 'Bearer',
//           authState: { username: response.firstName },
//         });
//         localStorage.setItem('loggedInUser', JSON.stringify(response));
//         dispatch(setLoggedInUserDetails(response));
//         navigate('/');
//       })
//       .catch((error) => {
//         showNotification(
//           true,
//           'error',
//           'Login Error',
//           error.response?.data || 'Unknown error'
//         );
//       });
//   };

//   useEffect(() => {
//     const initializeGoogleSignIn = () => {
//       if (window.google && window.google.accounts) {
//         window.google.accounts.id.initialize({
//           client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '',
//           callback: (response: { credential: string }) => {
//             submitUserDataFromGoogleAccount(response.credential);
//           },
//         });

//         window.google.accounts.id.renderButton(
//           document.getElementById('google-signin-button'),
//           { theme: 'outline', size: 'large' }
//         );
//       } else {
//         console.error('Google API not loaded yet');
//       }
//     };

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = initializeGoogleSignIn;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <Grid
//       container
//       justifyContent="center"
//       alignItems="center"
//       height="80vh"
//       sx={{
//         backgroundImage: `linear-gradient(rgba(72, 156, 242, 0.8), rgba(0, 0, 0, 0.8)), url(${forSignUp})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         padding: '20px',
//       }}
//     >
//       <Grid item xs={12} sm={6} md={4}>
//         <Typography
//           sx={{
//             fontWeight: '600',
//             fontSize: '30px',
//             lineHeight: '66.8px',
//             width: '250px',
//             color: 'white',
//           }}
//         >
//           Sign In
//         </Typography>
//         <StyledTextField
//           label="Email"
//           onChange={(e: any) => setUsername(e.target.value)}
//         />
//         <StyledTextField
//           label="Password"
//           type="password"
//           onChange={(e: any) => setPassword(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: '20px' }}
//           onClick={submit}
//         >
//           Sign In
//         </Button>
//         <Typography
//           variant="body2"
//           sx={{
//             margin: '10px 0',
//             lineHeight: '66.8px',
//             width: '250px',
//             color: 'white',
//           }}
//         >
//           Don't have an account?{' '}
//           <Button
//             variant="text"
//             color="inherit"
//             sx={{ textTransform: 'none', padding: 0, fontWeight: 'bold' }}
//             onClick={handleSignUp}
//           >
//             Sign Up
//           </Button>
//         </Typography>
//         <div id="google-signin-button"></div>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignIn;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useSignIn } from 'react-auth-kit';
import { useDispatch } from 'react-redux';
import { setLoggedInUserDetails } from '../../features/userDetailsSlice';
import { authApi } from '../API/AuthApi';
import bg from '../assets/bg.png';
import { useNotification } from '../context/NotificationProvider';

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
        showNotification(
          true,
          'error',
          'Login Error',
          error.response?.data || 'Unknown error'
        );
      });
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    navigate('/forgot-password');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '16px',
          padding: '32px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email"
              InputProps={{
                sx: {
                  bgcolor: 'white',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Password"
              type="password"
              InputProps={{
                sx: {
                  bgcolor: 'white',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: '#4799E9',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white', fontSize: '14px' }}>
                  Remember me
                </Typography>
              }
            />
            <Typography
              onClick={handleForgotPassword}
              sx={{
                color: '#FF8551',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Forgot password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={submit}
              sx={{
                textTransform: 'none',
                bgcolor: '#4799E9',
                borderRadius: '8px',
                padding: '12px',
                color: 'black',
                '&:hover': {
                  bgcolor: '#3d83ca',
                },
              }}
            >
              Sign-in
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                color: 'white',
                textAlign: 'center',
                fontSize: '14px',
                mt: 1,
              }}
            >
              Don't have an account?{' '}
              <span
                onClick={handleSignUp}
                style={{
                  color: '#FF8551',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Create an account
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SignIn;
