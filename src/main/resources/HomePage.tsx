import React from 'react';
import { Box, Typography, Button, Container, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { mainhomepage } from '../assets';

function HomePage() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${mainhomepage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            REACH YOUR LIMITS
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            AND GET TO THE NEXT LEVEL
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mb={6}>
            <Button component={Link} to="/about" variant="outlined" color="inherit">ABOUT US</Button>
            <Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#f4511e' } }}>JOIN NOW</Button>
          </Stack>
        </Container>

        {/* SOCIAL & SCROLL */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, mb: 1 }}>SOCIAL</Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <IconButton sx={{ color: 'white' }}><FacebookIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><InstagramIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><TwitterIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><EmailIcon /></IconButton>
          </Stack>
          <Typography variant="caption">SCROLL DOWN</Typography>
          <Box
            sx={{
              mt: 1,
              width: 16,
              height: 16,
              borderLeft: '2px solid white',
              borderBottom: '2px solid white',
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
