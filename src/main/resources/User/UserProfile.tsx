import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import UserProfileLayout from './components/UserProfileLayout';

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      bgcolor: '#1A0B2E',
    }}
  >
    <CircularProgress sx={{ color: '#FF6B35' }} />
  </Box>
);

// Lazy loader overlay component
interface LazyLoaderOverlayProps {
  isLoading: boolean;
}

const LazyLoaderOverlay = ({ isLoading }: LazyLoaderOverlayProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1A0B2E',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoading ? 0.8 : 0,
        visibility: isLoading ? 'visible' : 'hidden',
        transition: 'opacity 0.6s ease-out, visibility 0.6s ease-out',
      }}
    >
      <CircularProgress 
        size={70} 
        thickness={5} 
        sx={{ 
          color: '#FF6B35',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
    </Box>
  );
};

/**
 * UserProfile Component
 * 
 * This is the main UserProfile component that renders the user's profile page.
 * The layout includes:
 * - Sidebar with navigation icons
 * - Timer and calendar section
 * - User profile information (editable)
 * - Bills section (expandable)
 * - History section
 */
const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    // Set viewport meta tag for proper mobile responsiveness
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
      document.getElementsByTagName('head')[0].appendChild(meta);
    } else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <LazyLoaderOverlay isLoading={loading} />
      <UserProfileLayout />
    </>
  );
};

export default UserProfile;