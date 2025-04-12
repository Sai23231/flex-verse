import React from 'react';

import { Box, Typography } from '@mui/material';

export const HeroPane = () => {
  return (
    <Box
      style={{
        background: 'transparent',
        paddingTop: '350px',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        height: '10vh',
        marginBottom: '150px',
        paddingRight: '100px',
      }}
    >
      <div>
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'helvetica',
            fontWeight: 'bold',
            fontSize: { xs: '30px', sm: '60px' },
            color: 'White',
            lineHeight: { xs: '75px', sm: '100.8px' },
            wordSpacing: '10px',
          }}
        >
          <div style={{ lineHeight: '1' }}>
            <span
              style={{
                color: 'rgb(0, 190, 110)',
                marginRight: '20px',
                fontSize: '100px',
              }}
            >
              Become
            </span>
            the best
            <br className="sm:block hidden" />{' '}
            <span className="text-gradient">Version Of</span>
            <span
              style={{
                color: 'rgb(0, 190, 110)',
                marginLeft: '20px',
                fontSize: '100px',
              }}
            >
              Yourself
            </span>
          </div>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'helvetica, Mohave',
            fontWeight: 'thin',
            color: 'white',
            fontSize: '20px',
            lineHeight: '30.8px',
            maxWidth: '670px',
          }}
        >
          The ultimate platform to reach your fitness goals. Get customized
          workout plans, diets tailored to your preference, and expert
          counselling here. Or, find a gym near you, take a virtual tour, and
          join online.
        </Typography>
      </div>
    </Box>
  );
};
