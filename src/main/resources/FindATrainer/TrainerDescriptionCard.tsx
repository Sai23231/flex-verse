import React from 'react';

import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

import { renderRatingStars } from '../Utils/RenderRatingStars';

import type { Trainer } from '../Models';

interface TrainerDescriptionCardProps {
  trainer: Trainer;
  setTrainerToDisplay: (arg0: Trainer) => void;
}

export const TrainerDescriptionCard: React.FC<TrainerDescriptionCardProps> = (
  props
) => {
  const { trainer, setTrainerToDisplay } = props;
  const specializationsString = trainer.specializations
    .map((s) => s.title)
    .join(', ');
  return (
    <Box
      onClick={() => {
        setTrainerToDisplay(trainer);
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          maxWidth: '98%',
          margin: '10px 10px 10px 10px',
        }}
      >
        <CardContent>
          <Avatar
            src={`http://localhost:8080/consultant/${trainer.id}/image`}
            sx={{ width: 80, height: 80 }}
          />
        </CardContent>
        <CardContent sx={{ width: '20%' }}>
          <Typography variant="h6" gutterBottom>
            {trainer.firstName} {trainer.lastName}
          </Typography>
          {renderRatingStars(5, 'small')}
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {specializationsString}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {trainer.sex}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {trainer.shortBio}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1" paragraph>
            {trainer.shortBio}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
