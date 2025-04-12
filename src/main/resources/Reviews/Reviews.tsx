import { Box, Grid, Typography } from '@mui/material';

import { CustomerReviews } from './CustomerReviews';
import { ReviewSummary } from './ReviewSummary';

export interface ReviewItem {
  firstName: string;
  lastName: string;
  rating: number;
  review: string;
  avatar: string;
}

interface ReviewsProps {
  totalReviews: number;
  itemsPerPage?: number;
  consultantId: string;
}

export const Reviews: React.FC<ReviewsProps> = ({
  totalReviews,
  itemsPerPage = 10,
  consultantId,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h6">Reviews</Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <ReviewSummary consultantId={consultantId} />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <CustomerReviews
            totalReviews={totalReviews}
            reviewsPerPage={itemsPerPage}
            trainerId={consultantId}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
