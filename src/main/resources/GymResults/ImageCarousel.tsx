import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';

interface ImageCarouselProps {
  gymImages: string[];
  setShowModal: (arg0: boolean) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = (props) => {
  const { gymImages, setShowModal } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Grid item xs={12} sm={6} sx={{ marginBottom: 2 }}>
      <Carousel
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
      >
        {gymImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Gym ${index + 1}`}
              style={{
                width: '100%',
                height: '36vh',
                objectFit: 'cover',
                filter: activeIndex === index ? 'none' : 'brightness(0.7)',
              }}
            />
          </div>
        ))}
      </Carousel>
    </Grid>
  );
};
