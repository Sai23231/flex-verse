import React, { useState } from 'react';

import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { SignUpFormValues } from './CompleteSignUp';

interface BioSectionProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  setProfilePicture: (file: File | null) => void;
}

const BioSection: React.FC<BioSectionProps> = ({
  register,
  errors,
  setProfilePicture,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setProfilePicture(file);
  };
  return (
    <>
      <Typography variant="h6" color="primary" gutterBottom>
        Bio Information
      </Typography>

      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Short Bio"
        {...register('shortBio', { required: true })}
        error={!!errors.shortBio}
        helperText={errors.shortBio ? 'Short bio is required' : ''}
        sx={{ backgroundColor: 'white' }}
      />

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          variant="filled"
          margin="normal"
          label="Price Per Consultation"
          {...register('pricePerConsultation', {
            required: 'Price per consultation is required',
            pattern: {
              value: /^[+-]?([0-9]*[.])?[0-9]+$/,
              message: 'Please enter a valid number',
            },
          })}
          error={!!errors.pricePerConsultation}
          helperText={
            errors.pricePerConsultation
              ? errors.pricePerConsultation.message
              : ''
          }
          sx={{ backgroundColor: 'white', flexGrow: 1 }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          select
          variant="filled"
          margin="normal"
          label="Currency"
          {...register('currency', { required: 'Currency is required' })}
          error={!!errors.currency}
          helperText={errors.currency ? 'Currency is required' : ''}
          sx={{ backgroundColor: 'white', width: '100px' }} // Adjust width as needed
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
        </TextField>
      </Box>
      <TextField
        variant="filled"
        fullWidth
        margin="normal"
        label="Long Bio"
        {...register('longBio')}
        multiline
        rows={4}
        sx={{ backgroundColor: 'white' }}
      />
      <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
        Upload Profile Picture
        <input
          type="file"
          hidden
          accept=".png, .jpg, .jpeg" // Restrict file types
          onChange={handleFileChange}
        />
      </Button>

      {selectedFile && (
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
    </>
  );
};

export default BioSection;
