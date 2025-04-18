import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';

import { trainerApi } from '../../../API/TrainerApi';

interface CheckboxComponentProps {
  title: string;
  setSelections: (arg0: string[]) => void;
  onClose: () => void;
  type: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = (props) => {
  const { title, setSelections, onClose, type } = props;
  const [filterCriteria, setFilterCriteria] = useState<string[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  useEffect(() => {
    if (type == 'TRAINER' || type == 'DIETITIAN') {
      trainerApi
        .getSpecializations(type)
        .then((response) => setFilterCriteria(response));
    }
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setSelectedCheckboxes((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleDone = () => {
    setSelections(selectedCheckboxes);
    onClose();
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: '999',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <FormGroup>
          <Grid container spacing={2}>
            {filterCriteria.map((checkbox: string) => (
              <Grid key={checkbox} item xs={8} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCheckboxes.includes(checkbox)}
                      onChange={handleCheckboxChange}
                      value={checkbox}
                    />
                  }
                  label={checkbox}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDone()}
        >
          Done
        </Button>
      </Box>
    </ClickAwayListener>
  );
};

export default CheckboxComponent;
