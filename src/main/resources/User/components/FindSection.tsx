import React from 'react';
import { Box, Typography, TextField, Button, Container, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Replace these with your actual image imports
import Gymimage from '../../../assets/Gymimage.png';
import GirlFind from '../../../assets/GirlFind.png';
import BoyFind from '../../../assets/BoyFind.png';
import FindDietition from '../../../assets/FindDietation.png';
import Fireimg from '../../../assets/Fireimg.png';
import Heartimg from '../../../assets/Heartimg.png';

// Custom styled components
const SearchTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    height: '40px',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#CCCCCC',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7E35',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
  },
});

const SearchButton = styled(Button)({
  backgroundColor: '#FF7E35',
  color: 'white',
  borderRadius: '4px',
  height: '40px',
  padding: '0 20px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#E56B25',
  },
});

const FindTrainerButton = styled(Button)({
  backgroundColor: '#FF7E35',
  color: 'white',
  borderRadius: '24px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#E56B25',
  },
});

const FindSection: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Gym Section */}
      <Box
        sx={{
          bgcolor: '#3A3A3A',
          width: '100%',
          py: 8,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            {/* Gym Image */}
            <Box sx={{ width: { xs: '100%', md: '40%' }, textAlign: 'center' }}>
              <Box
                component="img"
                src={Gymimage}
                alt="Gym equipment"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '50% 50% 0 0',
                  maxHeight: '400px',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Gym Search Content */}
            <Box sx={{ width: { xs: '100%', md: '60%' }, color: 'white', pl: { md: 4 } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Discover most suitable{' '}
                <Box component="span" sx={{ color: '#FF7E35' }}>
                  Gym
                </Box>{' '}
                Near You
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#E0E0E0',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Easily find variety of gym near you and select the best which suits you.
              </Typography>

              {/* Search Fields */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mt: 2,
                }}
              >
                <SearchTextField
                  placeholder="Enter Country"
                  size="small"
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: '30%' } }}
                />
                <SearchTextField
                  placeholder="Enter State"
                  size="small"
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: '30%' } }}
                />
                <SearchTextField
                  placeholder="Enter city"
                  size="small"
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: '30%' } }}
                />
                <SearchButton
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Search
                </SearchButton>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Trainer Section */}
      <Box
        sx={{
          bgcolor: '#333333',
          width: '100%',
          py: 8,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              position: 'relative',
              height: '100%',
            }}
          >
            {/* Trainer Content */}
            <Box sx={{ 
              width: { xs: '100%', md: '50%' }, 
              color: 'white', 
              zIndex: 2,
              position: 'relative' 
            }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Find the most suitable{' '}
                <Box component="span" sx={{ color: '#FF7E35' }}>
                  Trainer
                </Box>{' '}
                near you
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#E0E0E0',
                  fontSize: '1.125rem',
                  maxWidth: '500px',
                }}
              >
                Connect with certified trainers who can help you achieve your fitness goals with personalized workout plans.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <FindTrainerButton
                  variant="contained"
                  endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                  size="large"
                >
                  FIND A TRAINER
                </FindTrainerButton>
              </Box>
            </Box>

            {/* Trainer Images */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' }, 
                height: { xs: '300px', md: '400px' },
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Orange Circle Background */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FF7E35 0%, #FF7E35 70%, transparent 70%)',
                  zIndex: 1,
                }}
              />

              {/* Male Trainer Image */}
              <Box
                component="img"
                src={BoyFind}
                alt="Male trainer"
                sx={{
                  position: 'absolute',
                  right: { xs: '0%', md: '5%' },
                  bottom: '0%',
                  height: '90%',
                  width: 'auto',
                  maxHeight: '400px',
                  zIndex: 2,
                }}
              />

              {/* Female Trainer Image */}
              <Box
                component="img"
                src={GirlFind}
                alt="Female trainer"
                sx={{
                  position: 'absolute',
                  left: { xs: '0%', md: '5%' },
                  bottom: '0%',
                  height: '85%',
                  width: 'auto',
                  maxHeight: '380px',
                  zIndex: 2,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Dietitian Section */}
      <Box
        sx={{
          bgcolor: '#333333',
          width: '100%',
          py: 8,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            {/* Dietitian Image */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '300px', md: '400px' },
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* Orange circle background */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: '250px', md: '300px' },
                    height: { xs: '250px', md: '300px' },
                    borderRadius: '50%',
                    backgroundColor: '#FF7E35',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />
                
                {/* Dotted pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: '150px', md: '200px' },
                    height: { xs: '150px', md: '200px' },
                    borderRadius: '50%',
                    border: '2px dotted white',
                    opacity: 0.5,
                    left: '10%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 0,
                  }}
                />

                {/* Woman checking fitness tracker */}
                <Box
                  component="img"
                  src={FindDietition}
                  alt="Woman checking fitness tracker"
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    maxHeight: { xs: '300px', md: '400px' },
                    width: 'auto',
                  }}
                />

                {/* Heart rate indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '25%',
                    backgroundColor: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 3,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src={Heartimg}
                    alt="Heart icon"
                    sx={{ width: '24px', height: '24px' }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                      70 bpm
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Heart Rate
                    </Typography>
                  </Box>
                </Box>

                {/* Fat burning indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    backgroundColor: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 3,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src={Fireimg}
                    alt="Fire icon"
                    sx={{ width: '24px', height: '24px' }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                      24%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Fat Burning
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Dietitian Content */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, color: 'white', pl: { md: 4 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Find the most suitable{' '}
                <Box component="span" sx={{ color: '#FF7E35' }}>
                  Dietitian
                </Box>{' '}
                near you
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#E0E0E0',
                  fontSize: '1.125rem',
                  maxWidth: '500px',
                }}
              >
                Connect with certified dietitians who can help you achieve your health and fitness goals with personalized nutrition plans.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FindSection;