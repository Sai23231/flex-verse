import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Reviews } from '../Reviews/Reviews';
import { GymDetails } from './GymDetails';
import { ImageCarousel } from './ImageCarousel';
import { ImageContainer } from './ImageContainer';
import { ImagesModal } from './ImagesModal';
import { gymApi } from '../../API/GymApi';
import { Gym } from '../Models';

const GymPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const gymId = location.state.gymId;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [showModal, setShowModal] = useState(false);
  const [gymDetail, setGymDetail] = useState<Gym>();
  const [loading, setLoading] = useState<boolean>(true);
  const gymImages = [
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
  ];

  const gymName = 'Fitness First Gym';

  useEffect(() => {
    gymApi
      .getGymDetails(gymId)
      .then((response) => {
        setGymDetail(response);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <CircularProgress />
  ) : (
    <Box p={4}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        {gymDetail?.name}
      </Typography>
      {gymDetail?.averageRating && (
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Typography variant="body1" color="text.secondary" marginRight={1}>
            Rating:
          </Typography>
          <Rating value={gymDetail?.averageRating} precision={0.5} readOnly />
          <Typography variant="body1" color="text.secondary" marginLeft={1}>
            (300 reviews)
          </Typography>
        </Box>
      )}
      {isSmallScreen ? (
        <>
          <ImageCarousel gymImages={gymImages} setShowModal={setShowModal} />
          <GymDetails gymDetail={gymDetail} />
        </>
      ) : (
        <Grid container spacing={2} mt={2}>
          <ImageContainer gymImages={gymImages} setShowModal={setShowModal} />
          <GymDetails gymDetail={gymDetail} />
        </Grid>
      )}
      <Reviews consultantId="loda" totalReviews={10} />
      <ImagesModal
        gymImages={gymImages}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default GymPage;
