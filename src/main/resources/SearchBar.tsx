import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { gymApi } from '../API/GymApi';

const locations = [
  { label: 'New York' },
  { label: 'Los Angeles' },
  { label: 'Chicago' },
  { label: 'San Francisco' },
];

interface SearchBarProps {
  handleFindGymClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { handleFindGymClick } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleButtonClick = (prop: string) => {
    navigate(`/${prop}`, {
      state: {
        selectedCountry: selectedCountry,
        selectedState: selectedState,
        selectedCity: selectedCity,
      },
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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

  const [supportedCountriesList, setSupportedCountriesList] = useState<
    string[]
  >([]);
  const [supportedStatesList, setSupportedStatesList] = useState<string[]>([]);
  const [supportedCitiesList, setSupportedCitiesList] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const [isCountrySelected, setIsCountrySelected] = useState<Boolean>(false);
  const [isStateSelected, setIsStateSelected] = useState<Boolean>(false);
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

  if (isSmallScreen) {
    return (
      <>
        <Dialog open={isModalOpen}>
          <DialogTitle>Find a Gym</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the location details to search for a gym.
            </DialogContentText>
            <Autocomplete
              options={supportedCountriesList}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  placeholder="Enter Country"
                  sx={{
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: '10px',
                    marginTop: '10px',
                  }}
                />
              )}
            />
            <Autocomplete
              options={locations}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  placeholder="Enter City"
                  sx={{ borderRadius: 10, width: '100%' }}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFindGymClick} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleButtonClick('findAGym');
                handleModalClose();
              }}
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        marginBottom: '150px',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: '600',
          fontSize: '25px',
          color: 'white',
          width: '250px',
        }}
      >
        Find a Gym
      </Typography>
      <Autocomplete
        options={supportedCountriesList}
        getOptionLabel={(option) => option}
        onChange={handleSelectCountry}
        sx={{ backgroundColor: 'white', width: 500, mr: 8 }}
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
        sx={{ backgroundColor: 'white', width: 500, mr: 8 }}
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
        sx={{ backgroundColor: 'white', width: 500, mr: 8 }}
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#9d9fa1' }}
        onClick={() => handleButtonClick('findAGym')}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
