import React from 'react';

import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { useProfile } from '../../context/ProfileContextProvider';
import { ConsultantAccountDetails } from './ConsultantAccountDetails';
import { Consultations } from './Consultations';
import LeftSidePanel from './LeftSidePanel';
import MyAppointmentsPage from './MyAppointmentsPage';
import { MyCustomers } from './MyCustomers';

const ConsultantProfile = () => {
  const userDetails = useSelector(
    (state: any) => state.userDetails.loggedInUser
  );
  const { currentPage, changePageContext } = useProfile();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let componentToRender;
  switch (currentPage) {
    case 0:
      componentToRender = (
        <ConsultantAccountDetails userDetails={userDetails} />
      );
      break;
    case 3:
      {
        userDetails?.roleId == 100
          ? (componentToRender = <Consultations />)
          : (componentToRender = <MyCustomers />);
      }
      break;
    case 5:
      componentToRender = <MyAppointmentsPage />;
      break;
    default:
      componentToRender = (
        <ConsultantAccountDetails userDetails={userDetails} />
      );
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

export default ConsultantProfile;
