import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Menu as MenuIcon,
  Email as EmailIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MobileTopSidebarProps {}

const MobileTopSidebar = (props: MobileTopSidebarProps) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        background: '#FF6B35',
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 1000,
        boxShadow: '0 1px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: '32px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)', // Makes logo white
          }}
        />
      </Box>
      {/* Icons */}
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
        }}
      >
        <IconButton
          sx={{
            color: 'white',
            padding: '8px',
          }}
          onClick={() => handleNavigate('/messages')}
        >
          <EmailIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            color: 'white',
            padding: '8px',
          }}
          onClick={() => handleNavigate('/documents')}
        >
          <MenuBookIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            color: 'white',
            padding: '8px',
          }}
          onClick={() => handleNavigate('/community')}
        >
          <PeopleIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            color: 'white',
            padding: '8px',
          }}
          onClick={() => console.log('Menu clicked')}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileTopSidebar;
