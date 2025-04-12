import React from 'react';

import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { useProfile } from '../../context/ProfileContextProvider';
import { AccountDetails } from './AccountDetails';
import { Consultations } from './Consultations';
import GymMemberships from './GymMemberships';
import LeftSidePanel from './LeftSidePanel';

const MyProfile = () => {
  const { currentPage, changePageContext } = useProfile();
  const userDetails = useSelector(
    (state: any) => state.userDetails.loggedInUser
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let componentToRender;
  switch (currentPage) {
    case 0:
      componentToRender = <AccountDetails userDetails={userDetails} />;
      break;
    case 3:
      componentToRender = <Consultations />;
      break;
    case 4:
      componentToRender = <GymMemberships />;
      break;
    default:
      componentToRender = <AccountDetails userDetails={userDetails} />;
  }
  return (
    <Grid container spacing={2}>
      {isSmallScreen ? (
        <></>
      ) : (
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <LeftSidePanel setSelectedOption={changePageContext} />
        </Grid>
      )}
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
          {componentToRender}
        </div>
      </Grid>
    </Grid>
  );
};

export default MyProfile;
