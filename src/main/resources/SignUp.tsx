import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { authApi } from '../API/AuthApi';
import bg from '../assets/bg.png';
import { useNotification } from '../context/NotificationProvider';

const SignUp = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    authApi
      .signup({ ...data, role: 'USER', phone: '' })
      .then((response) => {
        showNotification(
          true,
          'success',
          'SignUp Success',
          'Please check your email for next steps'
        );
        navigate('/');
      })
      .catch((error) => {
        showNotification(true, 'error', 'SignUp Error', error.response.data);
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="First name"
                InputProps={{
                  sx: {
                    bgcolor: 'white',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }
                }}
                {...register('firstName', { required: true })}
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Last name"
                InputProps={{
                  sx: {
                    bgcolor: 'white',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }
                }}
                {...register('lastName', { required: true })}
                error={!!errors.lastName}
              />
            </Grid>
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
                      border: 'none'
                    }
                  }
                }}
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                })}
                error={!!errors.email}
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
                      border: 'none'
                    }
                  }
                }}
                {...register('password', {
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                })}
                error={!!errors.password}
              />
            </Grid>
            <Grid item xs={12}>
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
                    I agree to the terms and conditions
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
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
                Register
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
                Already have an account?{' '}
                <span
                  onClick={handleSignIn}
                  style={{ 
                    color: '#FF8551', 
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  Sign-in
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SignUp;