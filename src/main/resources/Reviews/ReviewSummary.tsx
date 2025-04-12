import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { trainerApi } from '../../API/TrainerApi';
import { useNotification } from '../../context/NotificationProvider';

interface ReviewSummaryProps {
  consultantId: string;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = (props) => {
  const { consultantId } = props;
  const showNotification = useNotification();
  const [ratingSummary, setRatingSummary] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  useEffect(() => {
    trainerApi
      .getTrainerRatingDetails(consultantId)
      .then((response) => {
        setRatingSummary([
          0,
          response.oneStars,
          response.twoStars,
          response.threeStars,
          response.fourStars,
          response.fiveStars,
        ]);
        setTotalRatings(response.totalRatings);
      })
      .catch((error) => {
        showNotification(
          true,
          'success',
          'Error Fetching Reviews',
          error.response.data
        );
      });
  }, []);
  return (
    <Box marginRight="10px">
      {[5, 4, 3, 2, 1].map((rating, index) => (
        <Box key={index} display="flex" alignItems="center">
          <Box width={60}>
            <Typography variant="body1">{rating} Stars</Typography>
          </Box>
          <Box flexGrow={1}>
            <Box
              display="flex"
              alignItems="center"
              bgcolor="#f0f0f0"
              height={20}
              borderRadius={4}
            >
              <Box
                width={(ratingSummary[rating] / totalRatings) * 100 + '%'}
                bgcolor="#4caf50"
                height={20}
                borderRadius={4}
              />
            </Box>
          </Box>
          <Typography variant="body1" marginLeft={1}>
            {ratingSummary[rating]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
