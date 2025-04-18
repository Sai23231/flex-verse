import React, { useState } from 'react';

import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  TextField,
} from '@mui/material';

interface PriceFilterComponentProps {
  lowPrice: number;
  highPrice: number;
  setLowPrice: (arg0: number) => void;
  setHighPrice: (arg0: number) => void;
  onClose: () => void;
}

const PriceFilterComponent: React.FC<PriceFilterComponentProps> = (props) => {
  const { lowPrice, highPrice, setLowPrice, setHighPrice, onClose } = props;

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(event.target.value, 10);
    setLowPrice(price);
    if (highPrice < price) {
      setHighPrice(price);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighPrice(parseInt(event.target.value, 10));
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
        <FormControl variant="outlined"></FormControl>
        <div style={{ display: 'flex', gap: '5px' }}>
          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            value={lowPrice}
            onChange={handleMinPriceChange}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            value={highPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <Button variant="contained" color="primary" onClick={onClose}>
          Done
        </Button>
      </Box>
    </ClickAwayListener>
  );
};

export default PriceFilterComponent;
