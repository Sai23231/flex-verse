import React from 'react';
import { Box, Typography, TextField, Button, Container, styled, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Replace these with your actual image imports
import Gymimage from '../../../assets/Gymimage.png';
import GirlFind from '../../../assets/GirlFind.png';
import BoyFind from '../../../assets/BoyFind.png';
import FindDietition from '../../../assets/FindDietation.png';
import Fireimg from '../../../assets/Fireimg.png';
import Heartimg from '../../../assets/Heartimg.png';
import { useNavigate } from 'react-router-dom';

// Custom styled components
const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    height: '40px',
    fontSize: '0.9rem',
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
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7E35',
  color: 'white',
  borderRadius: '4px',
  height: '40px',
  padding: '0 20px',
  textTransform: 'none',
  fontSize: '0.9rem',

}));

const FindActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7E35',
  color: 'white',
  borderRadius: '24px',
  padding: '0',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  height: '48px',
  overflow: 'hidden',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
  '& .MuiButton-startIcon': {
    marginRight: '8px',
  },
  '& .text-content': {
    padding: '12px 24px',
    display: 'inline-block',
  },
  '& .arrow-box': {
    backgroundColor: 'white',
    height: '100%',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderLeft: `1px solid ${'#FF7E35'}`,
    color: '#FF7E35',
  }
}));

const FindTrainerButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7E35',
  color: 'white',
  borderRadius: '24px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const FindSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo({
      top: 0,
    });
    navigate('/gymFinder');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Gym Section */}
      <Box
        sx={{
          bgcolor: '#3A3A3A',
          width: '100%',
          py: { xs: 6, md: 10 },
          // px: { xs: 2, md: 0 },
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
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Gym Image */}
            <Box sx={{ width: { xs: '80%', sm: '60%', md: '40%' }, mx: 'auto', textAlign: 'center' }}>
              <Box
                component="img"
                src={Gymimage}
                alt="Gym equipment"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '50% 50% 0 0',
                  maxHeight: { xs: '300px', sm: '350px', md: '400px' },
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Gym Search Content */}
            <Box sx={{ width: { xs: '100%', md: '55%' }, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
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
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                Easily find variety of gym near you and select the best which suits you.
              </Typography>

              {/* Search Fields */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  mt: 2,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <SearchTextField
                  placeholder="Enter Country"
                  size="small"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <SearchTextField
                  placeholder="Enter State"
                  size="small"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <SearchTextField
                  placeholder="Enter city"
                  size="small"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <SearchButton
                  onClick={handleNavigate}
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ flexShrink: 0 }}
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
          py: { xs: 6, md: 10 },
          // px: { xs: 2, md: 0 },
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
              gap: { xs: 4, md: 6 },
              position: 'relative',
              height: '100%',
            }}
          >
            {/* Trainer Content */}
            <Box sx={{ 
              width: { xs: '100%', md: '50%' }, 
              color: 'white', 
              zIndex: 2,
              position: 'relative',
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 2, md: 1 }
            }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
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
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  maxWidth: { xs: '100%', md: '500px' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Connect with certified trainers who can help you achieve your fitness goals with personalized workout plans.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <FindActionButton
                  variant="contained"
                  size="large"
                >
                  <Box component="span" className="text-content">FIND A TRAINER</Box>
                  <Box component="span" className="arrow-box">
                    <ArrowForwardIcon />
                  </Box>
                </FindActionButton>
              </Box>
            </Box>

            {/* Trainer Images */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '50%' }, 
                height: { xs: '350px', sm: '400px', md: '450px' },
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                order: { xs: 1, md: 2 }
              }}
            >
              {/* Orange Circle Background */}
              <Box
                sx={{
                  position: 'absolute',
                  width: { xs: '80%', sm: '70%', md: '100%' },
                  height: { xs: '80%', sm: '70%', md: '100%' },
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${'#FF7E35'} 0%, ${'#FF7E35'} 60%, transparent 60%)`,
                  zIndex: 1,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Male Trainer Image */}
              <Box
                component="img"
                src={BoyFind}
                alt="Male trainer"
                sx={{
                  position: 'absolute',
                  // right: { xs: 'auto', sm: '0%', md: '5%' },
                  left: { xs: '60%', sm: '50%' },
                  bottom: '0%',
                  transform: { xs: 'translateX(-40%)', sm: 'translateX(0)' },
                  height: { xs: '80%', sm: '85%', md: '90%' },
                  width: 'auto',
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
                  // left: { xs: 'auto', sm: '0%', md: '5%' },
                  right: { xs: '60%', sm: '50%' },
                  bottom: '0%',
                  transform: { xs: 'translateX(40%)', sm: 'translateX(0)' },
                  height: { xs: '75%', sm: '80%', md: '85%' },
                  width: 'auto',
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
          py: { xs: 6, md: 10 },
          // px: { xs: 2, md: 0 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Dietitian Image */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '400px', sm: '450px', md: '500px' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Orange circle background */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: { xs: '280px', sm: '320px', md: '350px' },
                    height: { xs: '280px', sm: '320px', md: '350px' },
                    borderRadius: '50%',
                    backgroundColor: '#FF7E35',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />
                
                {/* Dotted pattern - Hidden on xs */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: { sm: '180px', md: '220px' },
                    height: { sm: '180px', md: '220px' },
                    borderRadius: '50%',
                    border: '2px dotted white',
                    opacity: 0.5,
                    left: { sm: '5%', md: '10%' },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 0,
                    display: { xs: 'none', sm: 'block' }
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
                    maxHeight: { xs: '350px', sm: '400px', md: '450px' },
                    width: 'auto',
                    maxWidth: '90%'
                  }}
                />

                {/* Heart rate indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '8%', sm: '12%', md: '15%' },
                    right: { xs: '5%', sm: '15%', md: '20%' },
                    backgroundColor: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <Box
                    component="img"
                    src={Heartimg}
                    alt="Heart icon"
                    sx={{ width: { xs: '20px', sm: '24px' }, height: { xs: '20px', sm: '24px' } }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      70 bpm
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                      Heart Rate
                    </Typography>
                  </Box>
                </Box>

                {/* Fat burning indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '10%', sm: '15%', md: '20%' },
                    left: { xs: '5%', sm: '10%', md: '15%' },
                    backgroundColor: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <Box
                    component="img"
                    src={Fireimg}
                    alt="Fire icon"
                    sx={{ width: { xs: '20px', sm: '24px' }, height: { xs: '20px', sm: '24px' } }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      24%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                      Fat Burning
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Dietitian Content */}
            <Box sx={{ width: { xs: '100%', md: '50%' }, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
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
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  maxWidth: { xs: '100%', md: '500px' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Connect with certified dietitians who can help you achieve your health and fitness goals with personalized nutrition plans.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <FindActionButton
                  variant="contained"
                  size="large"
                >
                  <Box component="span" className="text-content">FIND A DIETITIAN</Box>
                  <Box component="span" className="arrow-box">
                    <ArrowForwardIcon />
                  </Box>
                </FindActionButton>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FindSection;