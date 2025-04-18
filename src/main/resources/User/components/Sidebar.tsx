import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { 
  Menu as MenuIcon, 
  Email as EmailIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Changed by Harsh Jain - Import logo from assets for sidebar branding
import logo from '../assets/logo.png';

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        background: '#FF6B35',
        width: '4vw',
        minWidth: '50px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
        zIndex: 1000,
        boxShadow: '1px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Changed by Harsh Jain - Updated logo container to remove white background */}
      <Box
        sx={{
          width: '40px',
          height: '40px',
          margin: '0 auto 30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Changed by Harsh Jain - Updated logo image with white filter */}
        <Box 
          component="img" 
          src={logo}
          alt="Logo"
          sx={{
            width: '150%',
            height: '150%',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)', // Changed by Harsh Jain - Added filter to make logo white
          }} 
        />
      </Box>
      
      <IconButton 
        sx={{ color: 'white' }}
        onClick={() => console.log('Menu clicked')}
      >
        <MenuIcon />
      </IconButton>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <Tooltip title="Messages" placement="right">
          <IconButton 
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onClick={() => handleNavigate('/messages')}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Documents" placement="right">
          <IconButton 
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onClick={() => handleNavigate('/documents')}
          >
            <MenuBookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Community" placement="right">
          <IconButton 
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onClick={() => handleNavigate('/community')}
          >
            <PeopleIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar; 