import { useNavigate } from 'react-router-dom';

import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useSignIn } from 'react-auth-kit';
import { useForm } from 'react-hook-form';

import { authApi } from '../../API/AuthApi';
import { forSignUp } from '../../assets';
import { useNotification } from '../../context/NotificationProvider';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string[];
}

const SignUpConsultant = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { showNotification } = useNotification();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      role: [],
    },
  });

  const onSubmit = (data: any) => {
    authApi
      .signupConsultant({ ...data })
      .then((response) => {
        showNotification(
          true,
          'success',
          'SignUp Success',
          'Please check your email for the next steps'
        );
        navigate('/');
      })
      .catch((error) => {
        showNotification(true, 'success', 'SignUp Error', error.response.data);
      });
  };

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
        height: '100%',
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="filled"
            fullWidth
            margin="normal"
            label="First Name"
            {...register('firstName', { required: true })}
            error={!!errors.firstName}
            helperText={errors.firstName ? 'First Name is required' : ''}
            sx={{ backgroundColor: 'white' }}
          />

          <TextField
            variant="filled"
            fullWidth
            margin="normal"
            label="Last Name"
            {...register('lastName', { required: true })}
            error={!!errors.lastName}
            helperText={errors.lastName ? 'Last Name is required' : ''}
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            select
            variant="filled"
            fullWidth
            margin="normal"
            label="Gender"
            {...register('gender', { required: true })}
            error={!!errors.gender}
            helperText={errors.gender ? 'Gender is required' : ''}
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            variant="filled"
            fullWidth
            margin="normal"
            label="Email"
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
            error={!!errors.email}
            helperText={
              errors.email ? 'Please enter a valid email address' : ''
            }
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            label="Password"
            {...register('password', {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
            })}
            error={!!errors.password}
            helperText={
              errors.password
                ? 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character'
                : ''
            }
            sx={{ backgroundColor: 'white' }}
          />

          <TextField
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === getValues('password'),
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
            sx={{ backgroundColor: 'white' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Sign Up
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{
            margin: '10px 0',
            lineHeight: '66.8px',
            width: '250px',
            color: 'white',
          }}
        >
          Already have an account?{' '}
          <Button
            variant="text"
            color="inherit"
            sx={{ textTransform: 'none', padding: 0, fontWeight: 'bold' }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignUpConsultant;
