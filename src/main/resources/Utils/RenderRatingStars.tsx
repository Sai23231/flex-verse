import React from 'react';

import { Star, StarHalf } from '@mui/icons-material';

export const renderRatingStars = (rate: number, size?: 'small' | 'medium') => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate - fullStars >= 0.25 && rate - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starIcon = size === 'small' ? <Star fontSize="inherit" /> : <Star />;
  const starHalfIcon =
    size === 'small' ? <StarHalf fontSize="inherit" /> : <StarHalf />;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(React.cloneElement(starIcon, { key: i, color: 'primary' }));
  }

  if (hasHalfStar) {
    stars.push(
      React.cloneElement(starHalfIcon, { key: fullStars, color: 'primary' })
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      React.cloneElement(starIcon, {
        key: fullStars + i + 1,
        color: 'disabled',
      })
    );
  }

  return stars;
};
