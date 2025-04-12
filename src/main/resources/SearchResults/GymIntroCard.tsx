import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import { renderRatingStars } from '../Utils/RenderRatingStars';

import type { Gym } from '../Models';

const images = [
  'https://via.placeholder.com/400',
  'https://via.placeholder.com/400',
  'https://via.placeholder.com/400',
];

interface GymIntroCardProps {
  gym: Gym;
}

const GymIntroCard: React.FC<GymIntroCardProps> = ({ gym }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/gymDetails', { state: { gymId: gym.id } });
  };
  return (
    <div onClick={handleButtonClick}>
      <Card
        sx={{
          margin: '0',
          overflow: 'hidden',
          marginBottom: '10px',
          width: '100%',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Carousel>
          {images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="300"
              image={image}
              alt={`Gym Image ${index + 1}`}
              sx={{ objectFit: 'cover' }}
            />
          ))}
        </Carousel>
        <CardContent sx={{ height: '100px', paddingTop: '0px' }}>
          <Typography gutterBottom variant="h5" component="div">
            {gym.name}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {gym.addressLine1}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {gym.city}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {gym.averageRating && (
                <Typography variant="body2" color="text.secondary">
                  Rating: {renderRatingStars(gym.averageRating)}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default GymIntroCard;
