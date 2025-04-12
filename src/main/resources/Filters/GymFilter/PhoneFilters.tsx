import React, { useState } from 'react';

import {
  AppBar,
  Autocomplete,
  Button,
  Collapse,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { gymFilterCriteria } from '../../../constants/Constants';
import CheckboxComponent from '../FilterUtils/CheckboxComponent';
import FilterDropdown from '../FilterUtils/FilterDropdown';
import PriceFilterComponent from '../FilterUtils/PriceFilterComponent';

const locations = [
  { label: 'New York' },
  { label: 'Los Angeles' },
  { label: 'Chicago' },
  { label: 'San Francisco' },
];

interface FiltersProps {
  lowPrice: number;
  highPrice: number;
  setLowPrice: (arg0: number) => void;
  setHighPrice: (arg0: number) => void;
}

export const PhoneFilters: React.FC<FiltersProps> = (props) => {
  const { lowPrice, highPrice, setLowPrice, setHighPrice } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 0',
        }}
      >
        {isSmallScreen && (
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleCollapse}
            style={{ marginBottom: '10px' }}
          >
            Toggle Filters
          </Button>
        )}
        <Collapse in={!isCollapsed}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              sx={{
                backgroundColor: 'white',
                width: isSmallScreen ? '70%' : 250,
                marginBottom: isSmallScreen ? '10px' : 0,
                marginRight: isSmallScreen ? 0 : 8,
                borderRadius: 10,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  placeholder="Enter Country"
                  sx={{ borderRadius: 10 }}
                />
              )}
            />
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              sx={{
                backgroundColor: 'white',
                width: isSmallScreen ? '70%' : 250,
                marginBottom: isSmallScreen ? '10px' : 0,
                marginRight: isSmallScreen ? 0 : 8,
                borderRadius: 10,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  placeholder="Enter City"
                  sx={{ borderRadius: 10 }}
                />
              )}
            />
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              sx={{
                backgroundColor: 'white',
                width: isSmallScreen ? '70%' : 250,
                marginBottom: isSmallScreen ? '10px' : 0,
                marginRight: isSmallScreen ? 0 : 8,
                borderRadius: 10,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  placeholder="Gym Type"
                  sx={{ borderRadius: 10 }}
                />
              )}
            />
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
                  onClose={handleClose}
                  type="GYM"
                  setSelections={() => {}}
                />
              )}
              filterType="Specialization"
            />
          </div>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: 'gold', marginTop: 10 }}
          >
            Search
          </Button>
        </Collapse>
      </div>
    </AppBar>
  );
};
