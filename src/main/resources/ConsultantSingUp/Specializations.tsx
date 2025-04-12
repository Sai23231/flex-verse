import React, { useState } from 'react';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';

import type { UseFormRegister } from 'react-hook-form';

import type { SignUpFormValues, SpecializationsObject } from './CompleteSignUp';

interface SpecializationsSectionProps {
  register: UseFormRegister<SignUpFormValues>;
  specializationsOptions: SpecializationsObject[];
}

const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({
  register,
  specializationsOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = specializationsOptions.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trainers = filteredOptions.filter((option) => option.roleId === 101);
  const dietitians = filteredOptions.filter((option) => option.roleId === 102);

  return (
    <FormControl component="fieldset">
      <TextField
        placeholder="Search Specializations..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3>Trainer</h3>
          <FormGroup>
            {trainers.map((option) => (
              <FormControlLabel
                key={option.title}
                control={
                  <Checkbox
                    {...register('specializations')}
                    value={option.title}
                  />
                }
                label={option.title}
              />
            ))}
          </FormGroup>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Dietitian</h3>
          <FormGroup>
            {dietitians.map((option) => (
              <FormControlLabel
                key={option.title}
                control={
                  <Checkbox
                    {...register('specializations')}
                    value={option.title}
                  />
                }
                label={option.title}
              />
            ))}
          </FormGroup>
        </div>
      </div>
    </FormControl>
  );
};

export default SpecializationsSection;
