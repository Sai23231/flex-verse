import React from 'react';
import { Box, useMediaQuery, useTheme, Paper, Typography, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import ProfileContent from './ProfileContent';

const UserProfileLayout = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackToHome = () => {
    // Navigation logic would go here
    console.log('Navigate back to homepage');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%',
      height: '100vh',
      bgcolor: '#1A0B2E',
      backgroundImage: 'linear-gradient(to right, #1A0B2E, #321450)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient shapes */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: '500px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, rgba(255,107,53,0) 70%)',
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -200,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(255,107,53,0) 70%)',
        zIndex: 0
      }} />
      
      {/* Sidebar */}
      <Box sx={{ 
        width: '64px', 
        display: { xs: 'none', md: 'block' },
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        bgcolor: '#FF6B35',
        zIndex: 10
      }}>
        <Sidebar />
      </Box>
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1,
        ml: { xs: 0, md: '64px' },
        p: 0,
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        height: '100%'
      }}>
        {/* Left Panel with Calendar */}
        <Box sx={{ 
          width: { xs: '100%', md: '360px' },
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 3, md: 4 },
          height: '100%',
          overflowY: 'auto'
        }}>
          {/* Back to Homepage */}
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              cursor: 'pointer'
            }}
            onClick={handleBackToHome}
          >
            <IconButton sx={{ color: 'white', p: 0, mr: 1 }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'white', 
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: 0.5
              }}
            >
              Back to homepage
            </Typography>
          </Box>
          
          {/* Upcoming Meeting Heading */}
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white', 
              mb: 0.5,
              fontWeight: 600
            }}
          >
            Upcoming meeting
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white', 
              mb: 3,
              opacity: 0.8
            }}
          >
            Session with Dietition • day 17
          </Typography>

          {/* Calendar and Timer */}
          <Calendar />
        </Box>
        
        {/* Right Panel with Profile, Bills and History */}
        <Box sx={{ 
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          pt: { md: 4.5 },
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex'
        }}>
          {/* Glass Panel for Profile, Bills and History */}
          <Paper 
            elevation={0}
            sx={{ 
              maxWidth: '1000px',
              width: '100%',
              height: 'fit-content',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              backgroundColor: 'rgba(58, 36, 90, 0.6)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              overflow: 'hidden'
            }}
          >
            {/* Profile Column */}
            <Box sx={{ 
              width: { xs: '100%', md: '50%' },
              maxWidth: { md: '450px' },
              p: 2.5
            }}>
              <ProfileContent />
            </Box>
            
            {/* Bills and History Column */}
            <Box sx={{ 
              width: { xs: '100%', md: '50%' },
              maxWidth: { md: '450px' },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 2.5,
              bgcolor: 'rgba(58, 36, 90, 0.4)',
            }}>
              <ProfileContent layout="bills" />
              <ProfileContent layout="history" />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileLayout; 