import React, { useState } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Paper,
  Typography,
  IconButton,
  Tabs,
  Tab,
  AppBar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import MobileTopSidebar from './MobileTopSidebar';
import Calendar from './Calendar';
import ProfileContent from './ProfileContent';
import { useNavigate } from 'react-router-dom';

const UserProfileLayout = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/user');
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        bgcolor: '#1A0B2E',
        backgroundImage: 'linear-gradient(to right, #1A0B2E, #321450)',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Background gradient shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: '500px',
          height: '520px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,107,53,0.4) 0%, rgba(255,107,53,0) 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -200,
          left: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(255,107,53,0) 70%)',
          zIndex: 0,
        }}
      />
      {/* Sidebar - desktop version */}
      {!isMobile && (
        <Box
          sx={{
            width: '64px',
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100%',
            bgcolor: '#FF6B35',
            zIndex: 10,
          }}
        >
          <Sidebar />
        </Box>
      )}
      {/* Mobile Top Sidebar */}
      {isMobile && <MobileTopSidebar />}
      {/* Mobile Navigation Bar with Back Button */}
      {isMobile && (
        <AppBar
          position="static"
          sx={{
            bgcolor: '#1A0B2E',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1.5,
              px: 2,
            }}
          >
            <IconButton
              sx={{ color: 'white', p: 0, mr: 1 }}
              onClick={handleBackToHome}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontWeight: 600,
                flexGrow: 1,
              }}
            >
              User Profile
            </Typography>
          </Box>
        </AppBar>
      )}
      {/* Mobile Tabs */}
      {isMobile && (
        <Box
          sx={{
            width: '100%',
            bgcolor: 'rgba(58, 36, 90, 0.6)',
            zIndex: 5,
            borderBottom: '2px solid rgba(255, 107, 53, 0.3)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF6B35',
                height: '3px',
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                py: 1.5,
                '&.Mui-selected': {
                  color: '#FF6B35',
                },
              },
            }}
          >
            <Tab label="Calendar & Timer" />
            <Tab label="Profile & History" />
          </Tabs>
        </Box>
      )}
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: '64px' },
          p: 0,
          display: 'flex',
          position: 'relative',
          zIndex: 1,
          height: isMobile ? 'calc(100vh - 113px - 56px - 60px)' : '100%', // Adjusted for top sidebar, tabs and bottom nav
          flexDirection: { xs: 'column', md: 'row' },
          overflow: { xs: 'auto', md: 'hidden' },
        }}
      >
        {/* Left Panel with Calendar - Only visible if activeTab is 0 on mobile */}
        <Box
          sx={{
            width: { xs: '100%', md: '360px' },
            display: {
              xs: isMobile && activeTab !== 0 ? 'none' : 'flex',
              md: 'flex',
            },
            flexDirection: 'column',
            p: { xs: 2, sm: 3, md: 4 },
            height: '100%',
            overflowY: 'auto',
          }}
        >
          {/* Back to Homepage - Not shown on mobile as it's in the AppBar */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                cursor: 'pointer',
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
                  letterSpacing: 0.5,
                }}
              >
                Back to homepage
              </Typography>
            </Box>
          )}
          {/* Upcoming Meeting Heading */}
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 0.5,
              fontWeight: 600,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Upcoming meeting
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              mb: 3,
              opacity: 0.8,
            }}
          >
            Session with Dietition • day 17
          </Typography>
          {/* Calendar and Timer */}
          <Calendar />
        </Box>
        {/* Right Panel with Profile, Bills and History - Only visible if activeTab is 1 on mobile */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            pt: { md: 4.5 },
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: {
              xs: isMobile && activeTab !== 1 ? 'none' : 'flex',
              md: 'flex',
            },
          }}
        >
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
              overflow: 'hidden',
            }}
          >
            {/* Profile Column */}
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                maxWidth: { md: '450px' },
                p: 2.5,
              }}
            >
              <ProfileContent />
            </Box>
            {/* Bills and History Column */}
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                maxWidth: { md: '450px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2.5,
                bgcolor: 'rgba(58, 36, 90, 0.4)',
              }}
            >
              <ProfileContent layout="bills" />
              <ProfileContent layout="history" />
            </Box>
          </Paper>
        </Box>
      </Box>
      {/* Bottom Navigation Bar for Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '56px',
            bgcolor: '#FF6B35',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 10,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
          }}
        >
          <IconButton sx={{ color: 'white' }}>
            <HomeIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <PersonIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default UserProfileLayout;
