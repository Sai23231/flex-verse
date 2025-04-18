import React from 'react';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFieldArray } from 'react-hook-form';

import type {
  Control,
  FieldArrayWithId,
  UseFormRegister,
} from 'react-hook-form';

import type { SignUpFormValues } from './CompleteSignUp';

interface Certification {
  type: string;
  certification: string;
  certificateFile: FileList | null;
}

interface CredentialsSectionProps {
  register: UseFormRegister<SignUpFormValues>;
  control: Control<SignUpFormValues>;
  fields: FieldArrayWithId<SignUpFormValues, 'certifications', 'id'>[];
  append: (certification: Omit<Certification, 'id'>) => void;
  remove: (index: number) => void;
}

const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  register,
  control,
  fields,
  append,
  remove,
}) => {
  return (
    <>
      <Typography variant="h6" color="primary" gutterBottom>
        Credentials
      </Typography>

      {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12}>
            <TextField
              label="Certification Type"
              variant="filled"
              fullWidth
              {...register(`certifications.${index}.type`)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Certification Title"
              variant="filled"
              fullWidth
              {...register(`certifications.${index}.certification`)}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              {...register(`certifications.${index}.certificateFile`)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => remove(index)}>Remove</Button>
          </Grid>
        </Grid>
      ))}

      <Button
        onClick={() =>
          append({ type: '', certification: '', certificateFile: null })
        }
      >
        Add More
      </Button>
    </>
  );
};

export default CredentialsSection;
