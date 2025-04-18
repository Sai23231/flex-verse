import React, { useState } from 'react';

import { Box, Grid, Pagination, Typography } from '@mui/material';

import GymIntroCard from './GymIntroCard';

import type { Gym } from '../Models';

interface GymResultsContainerProps {
  gymData: Gym[];
}

export const GymResultsContainer: React.FC<GymResultsContainerProps> = (
  props
) => {
  const gymData = props.gymData;

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event: any, page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGymData = gymData.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        padding: '10px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', marginBottom: '20px' }}
      >
        Search Results
      </Typography>
      <Grid container spacing={2}>
        {paginatedGymData.map((gym) => (
          <Grid key={gym.id} item xs={12} sm={6} md={6} lg={6} xl={6}>
            <GymIntroCard gym={gym} />
          </Grid>
        ))}
      </Grid>
      {gymData.length > itemsPerPage && (
        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
          <Pagination
            count={Math.ceil(gymData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      )}
    </Box>
  );
};
