import React from 'react';
import { Box, Typography, Button, Avatar, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import images
import heroImage from '../../../assets/heroimage.png';
import profileImage from '../../../assets/profile.png';

// Custom styled components
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

function Featured() {
  // Meeting data
  const meetings = [
    { day: 'Day 17', type: 'Legs' },
    { day: 'Day 17', type: 'Shoulder' },
    { day: 'Day 17', type: 'Chest' },
    { day: 'Day 17', type: 'Legs' },
    { day: 'Day 17', type: 'Shoulder' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Sidebar */}
      <Box sx={{ width: '60px', backgroundColor: '#FF7E35', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
        <Box sx={{ marginBottom: '20px' }}>
          <img src={heroImage} alt="Logo" width="30" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', flex: 1 }}>
          {/* Sidebar icons would go here */}
          <Box sx={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
          <Box sx={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
          <Box sx={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
          <Box sx={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex' }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            flex: 2, 
            position: 'relative', 
            backgroundColor: '#000',
            color: 'white',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end', // Changed to position content at bottom
          }}
        >
          {/* Background Image */}
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
              }
            }}
          >
            <img src={heroImage} alt="Hero" />
          </Box>

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1, marginBottom: '80px' }}> {/* Adjusted position */}
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800, // Increased font weight
                color: '#FF7E35', 
                fontSize: '3.2rem',
                lineHeight: 1.1,
                marginBottom: '8px'
              }}
            >
              Become the best<br />
              version of yourself
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                marginBottom: '32px',
                fontWeight: 300, // Lighter font weight
                fontSize: '1rem'
              }}
            >
              The ultimate platform to reach your fitness goals.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <OrangeButton endIcon={<span>→</span>}>
                Find a Gym
              </OrangeButton>
              <OrangeButton 
                sx={{ 
                  backgroundColor: 'transparent', 
                  border: '1px solid #FF7E35',
                  '&:hover': {
                    backgroundColor: 'rgba(255,126,53,0.1)',
                  }
                }}
              >
                About us
              </OrangeButton>
            </Box>
          </Box>
        </Box>

        {/* Right Panel */}
        <Box sx={{ flex: 1, backgroundColor: '#FFF', padding: '24px' }}> {/* Changed background to white */}
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
              marginBottom: '24px'
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
                }
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
                  padding: '0 0 8px 0'
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
                    padding: '16px'
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
  );
}

export default Featured;