import React, { useState } from 'react';

import { AppBar, Button, useMediaQuery, useTheme } from '@mui/material';

import { trainerSpecialization } from '../../../constants/Constants';
import CheckboxComponent from '../FilterUtils/CheckboxComponent';
import FilterDropdown from '../FilterUtils/FilterDropdown';
import PriceFilterComponent from '../FilterUtils/PriceFilterComponent';

import type { PageFilterProps } from '../../FindATrainer/FindATrainer';

interface FiltersProps {
  setPageFilters: (arg0: PageFilterProps) => void;
}

export const Filters: React.FC<FiltersProps> = (props) => {
  const { setPageFilters } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [lowPrice, setLowPrice] = useState<number>(0);
  const [highPrice, setHighPrice] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [specializations, setSpecializations] = useState<string[]>([]);

  const handleSearch = () => {
    setPageFilters({
      highPrice: highPrice,
      lowPrice: lowPrice,
      specializations: specializations,
    });
  };

  return (
    <AppBar
      position="static"
      style={{
        background: 'white',
        paddingBottom: '10px',
        paddingTop: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: '10px',
          padding: isSmallScreen ? '10px' : 0,
        }}
      >
        <FilterDropdown
          component={({ handleClose }) => (
            <PriceFilterComponent
              setLowPrice={setLowPrice}
              setHighPrice={setHighPrice}
              lowPrice={lowPrice}
              highPrice={highPrice}
              onClose={handleClose}
            />
          )}
          filterType="Price Filter"
        />
        <FilterDropdown
          component={({ handleClose }) => (
            <CheckboxComponent
              title="Select Specialization"
              setSelections={setSpecializations}
              onClose={handleClose}
              type="TRAINER"
            />
          )}
          filterType="Specialization"
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          size={isSmallScreen ? 'medium' : 'large'}
          style={{
            backgroundColor: 'gold',
            minWidth: isSmallScreen ? '120px' : 'auto',
          }}
        >
          Search
        </Button>
      </div>
    </AppBar>
  );
};
