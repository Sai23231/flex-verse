import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useSelector } from 'react-redux';

import { authApi } from '../API/AuthApi';
import { logo } from '../assets';
import navLinks from '../constants/Constants';

const Navbar: React.FC = () => {
  const userDetails = useSelector(
    (state: any) => state.userDetails.loggedInUser
  );
  const navigate = useNavigate();
  const signOut = useSignOut();
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = useIsAuthenticated();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const navigateToProfile = () => {
    if (userDetails.roleId == 100) {
      navigate('/profile');
    } else {
      navigate('/consultantProfile');
    }
  };

  const handleButtonClick = (prop: string) => {
    navigate(`/${prop}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signOut();
    authApi.logout();
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      style={{
        background: 'black',
      }}
    >
      <Toolbar>
        {isSmallScreen && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => handleButtonClick('')}
              style={{ marginRight: 'auto' }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: '48px', width: '60px' }}
              />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="notifications"
              style={{ marginLeft: 'auto' }}
            >
              <NotificationsIcon />
            </IconButton>
          </>
        )}
        {!isSmallScreen && (
          <>
            <Hidden smDown>
              <img
                src={logo}
                alt="Logo"
                style={{ height: '92px', width: '114px' }}
                onClick={() => handleButtonClick('')}
              />
            </Hidden>
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {navLinks.map((nav, index) => (
                <Button
                  key={index}
                  color="inherit"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleButtonClick(nav.id)}
                >
                  {nav.title}
                </Button>
              ))}
              {isAuthenticated() ? (
                <div>
                  <Button
                    color="inherit"
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ marginRight: '10px' }}
                  >
                    Profile
                  </Button>
                  <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={navigateToProfile}>
                      View Profile
                    </MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  color="inherit"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleButtonClick('signin')}
                >
                  Sign Up/Login
                </Button>
              )}
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
