import { AppBar, Autocomplete, Button, Slider, TextField } from '@mui/material';

import { gymFilterCriteria } from '../../../constants/Constants';
import CheckboxComponent from '../FilterUtils/CheckboxComponent';
import FilterDropdown from '../FilterUtils/FilterDropdown';
import PriceFilterComponent from '../FilterUtils/PriceFilterComponent';
import { useEffect, useState } from 'react';
import { gymApi } from '../../../API/GymApi';
import { Amenities } from '../../Models';
import { PageFilterProps } from '../../FindAGym';
import DiscreteSliderLabel from '../../DiscreteSliderLabel';
import LocationFilterComponent from '../FilterUtils/LocationFilterComponent';

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
  setPageFilters: (arg0: PageFilterProps) => void;
  pageFilters: any;
}

export const Filters: React.FC<FiltersProps> = (props) => {
  const {
    lowPrice,
    highPrice,
    setLowPrice,
    setHighPrice,
    setPageFilters,
    pageFilters,
  } = props;

  const handleSearch = () => {
    setPageFilters({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      amenity: selectedAmenity,
    });
  };

  const handleSelectAmenities = (event: any, value: any) => {
    setSelectedAmenity(value.name);
  };

  const [allGymAmenities, setAllGymAmenities] = useState<Amenities[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('');

  useEffect(() => {
    gymApi.getAllGymAmenities().then((response) => {
      setAllGymAmenities(response);
    });
  }, []);

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
          height: '6vh',
        }}
      >
        <FilterDropdown
          component={({ handleClose }) => (
            <LocationFilterComponent
              setSelectedCountry={setSelectedCountry}
              setSelectedState={setSelectedState}
              setSelectedCity={setSelectedCity}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              pageFilters={pageFilters}
              handleSearch={handleSearch}
              onClose={handleClose}
            />
          )}
          filterType="Location Filter"
        />
        <Autocomplete
          options={allGymAmenities}
          getOptionLabel={(option) => option.name}
          onChange={handleSelectAmenities}
          sx={{ backgroundColor: 'white', width: 250, mr: 8 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              color="primary"
              placeholder="Select Amenities"
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
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: 'gold' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </AppBar>
  );
};
