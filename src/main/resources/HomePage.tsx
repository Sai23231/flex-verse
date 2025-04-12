import React from 'react';

import { Box } from '@mui/system';
import { useIsAuthenticated } from 'react-auth-kit';

import { model } from '../assets';
import { ListingCarousel } from './Commons/ListingCarousel';
import FindOptions from './FindOptions/FindOptions';
import { HeroPane } from './HeroPane';

function HomePage() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,  0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${model})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '1080px',
          padding: '20px',
        }}
      >
        <HeroPane />
        <Box
          sx={{
            py: '2rem',
          }}
        >
          <FindOptions />
        </Box>
      </Box>
      <>
        <ListingCarousel title="Top Trainers Near You" type="Trainers" />
        <ListingCarousel title="Top Dieticians Near You" type="Dietitians" />
      </>
    </>
  );
}

export default HomePage;
