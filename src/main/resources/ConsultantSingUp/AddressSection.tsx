import React from 'react';

import { TextField, Typography } from '@mui/material';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { SignUpFormValues } from './CompleteSignUp';

interface AddressSectionProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      <Typography variant="h6" color="primary" gutterBottom>
        Address Information
      </Typography>

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Street Address"
        {...register('streetAddress')}
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Address Line 2"
        {...register('addressLine2')}
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="City"
        {...register('city')}
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="State"
        {...register('state', { required: 'State is required' })}
        error={!!errors.state}
        helperText={errors.state?.message}
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Country"
        {...register('country', { required: 'Country is required' })}
        error={!!errors.country}
        helperText={errors.country?.message}
        sx={{ backgroundColor: 'white' }}
      />

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Zip"
        {...register('zip', { required: 'Zip is required' })}
        error={!!errors.zip}
        helperText={errors.zip?.message}
        sx={{ backgroundColor: 'white' }}
      />
    </>
  );
};

export default AddressSection;
