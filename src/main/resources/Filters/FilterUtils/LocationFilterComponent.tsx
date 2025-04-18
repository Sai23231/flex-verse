import React, { useEffect, useState } from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { gymApi } from '../../../API/GymApi';
import DiscreteSliderLabel from '../../DiscreteSliderLabel';

interface LocationFilterComponentProps {
  setSelectedCountry: (arg0: string) => void;
  setSelectedState: (arg0: string) => void;
  setSelectedCity: (arg0: string) => void;
  handleSearch: () => void;
  onClose: () => void;
  selectedCountry: string;
  selectedState: string;
  pageFilters: any;
}

const PriceFilterComponent: React.FC<LocationFilterComponentProps> = (
  props
) => {
  const {
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    handleSearch,
    onClose,
    selectedCountry,
    selectedState,
    pageFilters,
  } = props;

  const handleSelectCountry = (event: any, value: any) => {
    if (value !== '' && value !== null) {
      setSelectedCountry(value);
      setIsCountrySelected(true);
    } else {
      setIsCountrySelected(false);
      setIsStateSelected(false);
    }
  };

  const handleSelectState = (event: any, value: any) => {
    if (value !== '' && value !== null) {
      setSelectedState(value);
      setIsStateSelected(true);
    } else {
      setIsStateSelected(false);
    }
  };

  const handleSelectCity = (event: any, value: any) => {
    if (value !== '' && value !== null) {
      setSelectedCity(value);
    }
  };

  const handleGymFilterByLocationCheckbox = (event: any, value: boolean) => {
    if (value) {
      setIsSearchGymsByLocationSelected(true);
      setIsSearchGymsNearMeSelected(false);
    } else {
      setIsSearchGymsByLocationSelected(false);
      setIsSearchGymsNearMeSelected(true);
    }
  };

  const handleGymFilterByNearMeCheckbox = (event: any, value: boolean) => {
    if (value) {
      setIsSearchGymsByLocationSelected(false);
      setIsSearchGymsNearMeSelected(true);
    } else {
      setIsSearchGymsByLocationSelected(true);
      setIsSearchGymsNearMeSelected(false);
    }
  };

  const [supportedCountriesList, setSupportedCountriesList] = useState<
    string[]
  >([]);
  const [supportedStatesList, setSupportedStatesList] = useState<string[]>([]);
  const [supportedCitiesList, setSupportedCitiesList] = useState<string[]>([]);

  const [isCountrySelected, setIsCountrySelected] = useState<Boolean>(false);
  const [isStateSelected, setIsStateSelected] = useState<Boolean>(false);

  const [isSearchGymsByLocationSelected, setIsSearchGymsByLocationSelected] =
    useState<boolean>(true);
  const [isSearchGymsNearMeSelected, setIsSearchGymsNearMeSelected] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isCountrySelected && !isStateSelected) {
      gymApi.getSupportedLocations().then((response) => {
        setSupportedCountriesList(response);
      });
    }
    if (isCountrySelected && !isStateSelected) {
      gymApi.getSupportedLocations(selectedCountry).then((response) => {
        setSupportedStatesList(response);
      });
    } else if (isCountrySelected && isStateSelected) {
      gymApi
        .getSupportedLocations(selectedCountry, selectedState)
        .then((response) => {
          setSupportedCitiesList(response);
        });
    }
  }, [selectedCountry, selectedState, isCountrySelected, isStateSelected]);

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
        {/* <FormControl variant="outlined"></FormControl> */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <FormControlLabel
            // eslint-disable-next-line no-constant-condition
            disabled={true ? isSearchGymsNearMeSelected : false}
            control={
              <Checkbox
                // eslint-disable-next-line no-constant-condition
                checked={true ? isSearchGymsByLocationSelected : false}
              />
            }
            label="Search Gyms by location"
            onChange={handleGymFilterByLocationCheckbox}
          />
          <Autocomplete
            // eslint-disable-next-line no-constant-condition
            disabled={true ? isSearchGymsNearMeSelected : false}
            options={supportedCountriesList}
            getOptionLabel={(option) => option}
            onChange={handleSelectCountry}
            sx={{ backgroundColor: 'white', width: 250, mr: 8 }}
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
            disabled={isCountrySelected ? false : true}
            options={supportedStatesList}
            getOptionLabel={(option) => option}
            onChange={handleSelectState}
            sx={{ backgroundColor: 'white', width: 250, mr: 8 }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                color="primary"
                placeholder="Enter State"
                sx={{ borderRadius: 10 }}
              />
            )}
          />
          <Autocomplete
            disabled={isStateSelected ? false : true}
            options={supportedCitiesList}
            getOptionLabel={(option) => option}
            onChange={handleSelectCity}
            sx={{ backgroundColor: 'white', width: 250, mr: 8 }}
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
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '50px' }}>
          <FormControlLabel
            // eslint-disable-next-line no-constant-condition
            disabled={true ? isSearchGymsByLocationSelected : false}
            control={
              // eslint-disable-next-line no-constant-condition
              <Checkbox checked={true ? isSearchGymsNearMeSelected : false} />
            }
            onChange={handleGymFilterByNearMeCheckbox}
            label="Search Gyms near me (Kms)"
          />
          <div
            style={{
              display: 'flex',
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '150px',
            }}
          >
            <DiscreteSliderLabel />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            marginTop: '50px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            style={{ width: '50%' }}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Box>
    </ClickAwayListener>
  );
};

export default PriceFilterComponent;
