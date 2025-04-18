import React, { useEffect, useState } from 'react';

import { Box, Pagination, Typography } from '@mui/material';

import { trainerApi } from '../../API/TrainerApi';
import { useNotification } from '../../context/NotificationProvider';
import { renderRatingStars } from '../Utils/RenderRatingStars';

import type { ReviewItem } from './Reviews';

interface CustomerReviewsProps {
  totalReviews: number;
  reviewsPerPage: number;
  trainerId: string;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = (props) => {
  const { totalReviews, reviewsPerPage, trainerId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const { showNotification } = useNotification();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    trainerApi
      .getTrainerReviews(trainerId, currentPage - 1)
      .then((response) => setReviews(response))
      .catch((error) =>
        showNotification(
          true,
          'failed',
          'Fetching Reviews Failed',
          error.response.data
        )
      );
  }, [currentPage, trainerId]);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + Math.min(reviewsPerPage, reviews.length);

  return (
    <Box>
      {reviews.map((review, index) => (
        <Box key={index} mt={2} display="flex">
          <Box ml={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {review.firstName} {review.lastName}{' '}
              {renderRatingStars(review.rating)}
            </Typography>
            <Typography>{review.review}</Typography>
          </Box>
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalReviews / reviewsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
      <Typography
        variant="body2"
        mt={2}
        textAlign="center"
        color="text.secondary"
      >
        Showing {startIndex + 1}-{endIndex} of {totalReviews} reviews
      </Typography>
    </Box>
  );
};
