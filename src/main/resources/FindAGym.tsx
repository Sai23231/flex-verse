import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';

import { gymApi } from '../API/GymApi';
import { Filters } from './Filters/GymFilter/Filters';
import { PhoneFilters } from './Filters/GymFilter/PhoneFilters';
import { Map } from './Maps/Map';
import { SmallScreenMap } from './Maps/SmallScreenMap';
import { GymResultsContainer } from './SearchResults/GymResultsContainer';

import type { Gym } from './Models';

export interface PageFilterProps {
  country: string;
  state: string;
  city: string;
  amenity: string;
}

export const FindAGym = () => {
  const location = useLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [lowPrice, setLowPrice] = useState<number>(0);
  const [highPrice, setHighPrice] = useState<number>(Number.MAX_SAFE_INTEGER);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [pageFilters, setPageFilters] = useState<PageFilterProps>({
    country: location.state.selectedCountry,
    state: location.state.selectedState,
    city: location.state.selectedCity,
    amenity: '',
  });

  const gymsPerPage = 10;
  const startIndex = (currentPage - 1) * gymsPerPage;
  const endIndex = startIndex + gymsPerPage;

  useEffect(() => {
    gymApi.getGymListCount().then((response) => {
      setTotalPages(response);
    });
  }, []);

  useEffect(() => {
    gymApi.getGymList(currentPage - 1, pageFilters).then((response) => {
      setGymList(response);
    });
  }, [currentPage, pageFilters]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {isSmallScreen ? (
        <>
          <PhoneFilters
            setLowPrice={setLowPrice}
            setHighPrice={setHighPrice}
            lowPrice={lowPrice}
            highPrice={highPrice}
          />
          <Grid container justifyContent="center">
            <Grid item xs={12} style={{ overflowY: 'hidden' }}>
              <SmallScreenMap />
            </Grid>
            <Grid item xs={12} style={{ overflowY: 'auto', maxHeight: '50vh' }}>
              <GymResultsContainer gymData={gymList} />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Filters
            setLowPrice={setLowPrice}
            setHighPrice={setHighPrice}
            lowPrice={lowPrice}
            highPrice={highPrice}
            setPageFilters={setPageFilters}
            pageFilters={pageFilters}
          />
          <Grid container justifyContent="center">
            <Grid
              item
              xs={7}
              sm={7}
              md={7}
              lg={7}
              style={{ overflowY: 'hidden' }}
            >
              <Map />
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              style={{ overflowY: 'auto' }}
            >
              <GymResultsContainer gymData={gymList} />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
