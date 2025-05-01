import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  Grid,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FeaturedContentSlider from './FeaturedContentSlider';
import heroImage from '../../../assets/heroimage.png';
import profileImage from '../../../assets/profile.png';
import logo from '../../../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const OrangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7E35',
  color: 'black',
  borderRadius: '25px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#FF7E35',
  },
}));

const DayItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
}));

// Styled box used in sidebar
const SidebarBox = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: '0.3s ease',
  '&:hover': {
    color: 'white',
  },
}));

function Featured() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/userProfile');
  }

  const meetings = [
    { day: 'Day 17', type: 'Legs' },
    { day: 'Day 17', type: 'Shoulder' },
    { day: 'Day 17', type: 'Chest' },
    { day: 'Day 17', type: 'Legs' },
    { day: 'Day 17', type: 'Shoulder' },
  ];

  // Updated sidebar icons to match the screenshot
  const sidebarIcons = [
    { icon: <MenuIcon />, label: 'Menu' },
    { icon: <EmailIcon />, label: 'Messages' },
    { icon: <MenuBookIcon />, label: 'Library' },
    { icon: <PeopleIcon />, label: 'Community' },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: isMobile ? '100%' : '60px',
        backgroundColor: '#FF7E35',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        height: isMobile ? 'auto' : '100%',
      }}
    >
      {/* Logo */}
      <Box sx={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', width: '100%', px: 2 }}>
        <img src={logo} alt="Logo" width="40" />
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Custom Styled Boxes with Icons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        {sidebarIcons.map((item, index) => (
          <Tooltip title={item.label} placement="right" arrow key={index}>
            <SidebarBox>
              {item.icon}
            </SidebarBox>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', height: { xs: 'auto', md: '100vh' }, overflow: 'hidden', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Sidebar - Hidden on mobile, shown in drawer */}
        {!isMobile && <SidebarContent />}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
            <IconButton onClick={toggleDrawer} sx={{ color: '#FF7E35' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen && isMobile}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%',
              maxWidth: '300px',
            },
          }}
        >
          <SidebarContent />
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Left Hero Image Section */}
          <Box
            sx={{
              flex: { xs: 'auto', md: 2 },
              position: 'relative',
              backgroundColor: '#000',
              color: 'white',
              padding: { xs: '24px', md: '40px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: { xs: '50vh', md: '100vh' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.6,
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
              }}
            >
              <img src={heroImage} alt="Hero" />
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, marginBottom: { xs: '40px', md: '80px' } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: '#FF7E35',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}
              >
                Become the best<br />
                version of yourself
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: '35px',
                  fontWeight: 300,
                  fontSize: '1rem',
                }}
              >
                The ultimate platform to reach your fitness goals.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <OrangeButton endIcon={<ArrowForwardIcon />}>Find a Gym</OrangeButton>
                <OrangeButton
                  sx={{
                    border: `1px solid ${'#FF7E35'}`,
                    backgroundColor: '#FF7E35',
                    color: 'black',

                  }}
                >
                  About us
                </OrangeButton>
              </Box>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box sx={{ 
            flex: { xs: 'auto', md: 1 }, 
            backgroundColor: '#FFF', 
            padding: { xs: '16px', sm: '24px' },
            maxWidth: { md: '400px' },
            width: '100%',
          }}>
            {/* User Profile */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#FFD5BB',
                padding: { xs: '12px', sm: '16px' },
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <Box sx={{ width: { xs: '60px', sm: '80px' }, height: { xs: '60px', sm: '80px' }, marginBottom: '12px' }}>
                <Avatar
                  sx={{ width: '100%', height: '100%', border: '2px solid #4CB3FF' }}
                  src={profileImage}
                  alt="User Profile"
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                Abubackar Sidhiq
              </Typography>
              <Button
                variant="contained"
                onClick={handleNavigate}
                sx={{
                  mt: 2,
                  borderRadius: '25px',
                  backgroundColor: '#4CB3FF',
                  color: '#000',
                  textTransform: 'none',
                  fontWeight: 'normal',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': {
                    backgroundColor: '#3a9fea',
                  },
                }}
              >
                Edit account information
              </Button>
            </Paper>

            {/* Upcoming Meetings */}
            <Box sx={{ 
                marginBottom: '24px', 
                backgroundColor: '#FF7E35',
                borderRadius: '12px', 
                padding: { xs: '12px', sm: '16px' },
                color: 'white'
            }}>
              <Box sx={{ marginBottom: '24px', position: 'relative' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'white',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    padding: '0 0 8px 0',
                  }}
                >
                  Upcoming meetings
                </Typography>
                <Divider sx={{ backgroundColor: 'black', height: '1px' }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  {meetings.map((meeting, index) => (
                    <React.Fragment key={index}>
                      <DayItem sx={{ paddingBottom: '8px' }}>
                        <Typography variant="body2" color="inherit" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {meeting.day}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {meeting.type}
                        </Typography>
                      </DayItem>
                      {index < meetings.length - 1 && (
                        <Divider sx={{ backgroundColor: 'black', height: '1px' }} />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderRadius: '12px',
                      padding: { xs: '12px', sm: '16px' },
                    }}
                  >
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem' } }}>
                      13
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                      Days remaining
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
        
      {/* Featured Content Slider */}
      <FeaturedContentSlider />
    
    </Box>
  );
}

export default Featured;