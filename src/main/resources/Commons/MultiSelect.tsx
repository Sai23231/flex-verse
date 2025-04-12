import React from 'react';

import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface MultiSelectProps {
  label: string;
  options: string[];
  control: any;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          select
          variant="filled"
          fullWidth
          label={label}
          value={field.value || []}
          onChange={(e) => field.onChange(e.target.value)}
          sx={{ backgroundColor: 'white', marginTop: 1, marginBottom: 1 }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => (selected as string[]).join(', '),
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default MultiSelect;
