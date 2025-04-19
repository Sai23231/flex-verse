import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  Grid,
  Divider,
  Tooltip,
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

const OrangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7E35',
  color: '#fff',
  borderRadius: '25px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#e06b29',
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: '60px',
            backgroundColor: '#FF7E35',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 0',
          }}
        >
          {/* Logo */}
          <Box sx={{ marginBottom: '40px' }}>
            <img src={logo} alt="Logo" width="40" />
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

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex' }}>
          {/* Left Hero Image Section */}
          <Box
            sx={{
              flex: 2,
              position: 'relative',
              backgroundColor: '#000',
              color: 'white',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
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

            <Box sx={{ position: 'relative', zIndex: 1, marginBottom: '80px' }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: '#FF7E35',
                  fontSize: '3.2rem',
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
              <Box sx={{ display: 'flex', gap: 2 ,}}>
                <OrangeButton endIcon={<span>→</span>}>Find a Gym</OrangeButton>
                <OrangeButton
                  sx={{
                    backgroundColor: '#FF7E35',
                    border: '1px solid #FF7E35'
                  }}
                >
                  About us
                </OrangeButton>
              </Box>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box sx={{ flex: 1, backgroundColor: '#FFF', padding: '24px' }}>
            {/* User Profile */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#FFD5BB',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <Box sx={{ width: '80px', height: '80px', marginBottom: '12px' }}>
                <Avatar
                  sx={{ width: '100%', height: '100%', border: '2px solid #4CB3FF' }}
                  src={profileImage}
                  alt="User Profile"
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Abubackar Sidhiq
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: '25px',
                  backgroundColor: '#4CB3FF',
                  textTransform: 'none',
                  fontWeight: 'normal',
                  '&:hover': {
                    backgroundColor: '#3a9fea',
                  },
                }}
              >
                Edit account information
              </Button>
            </Paper>

            {/* Upcoming Meetings */}
            <Box sx={{ marginBottom: '24px' }}>
              <Box sx={{ marginBottom: '24px', position: 'relative' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#FF7E35',
                    fontSize: '1.25rem',
                    padding: '0 0 8px 0',
                  }}
                >
                  Upcoming meetings
                </Typography>
                <Divider sx={{ backgroundColor: '#FF7E35', height: '2px' }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  {meetings.map((meeting, index) => (
                    <DayItem key={index}>
                      <Typography variant="body2" color="textSecondary">
                        {meeting.day}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {meeting.type}
                      </Typography>
                    </DayItem>
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
                      backgroundColor: '#FF7E35',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
                      13
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      Days remaining
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Featured Slider */}
      <FeaturedContentSlider />
    </Box>
  );
}

export default Featured;