import React from 'react';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { useIsAuthenticated } from 'react-auth-kit';

import { useProfile } from '../context/ProfileContextProvider';

const PhoneFooter = () => {
  const { currentPage, changePageContext } = useProfile();
  const isAuthenticated = useIsAuthenticated();
  const handlePageChange = (pageNumber: number) => {
    changePageContext(pageNumber);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} />
        {isAuthenticated() ? (
          <React.Fragment>
            <BottomNavigationAction
              component={Link}
              onClick={() => handlePageChange(4)}
              to="/profile"
              icon={<FitnessCenterIcon />}
            />
            <BottomNavigationAction
              component={Link}
              onClick={() => handlePageChange(3)}
              to="/profile"
              icon={<AssignmentIcon />}
            />
            <BottomNavigationAction
              component={Link}
              onClick={() => handlePageChange(2)}
              to="/profile"
              icon={<AccountCircleIcon />}
            />
          </React.Fragment>
        ) : (
          <BottomNavigationAction
            component={Link}
            to="/signin"
            icon={<PersonAddIcon />}
          />
        )}
      </BottomNavigation>
    </AppBar>
  );
};

export default PhoneFooter;
