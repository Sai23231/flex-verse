import './Layout.css';
import './Layout.css';

import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

import Footer from '../Footer';
import Header from '../Header';
import PhoneFooter from '../PhoneFooter';

export const Layout = (props: { component: any }) => {
  const { component } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className="layout-container">
      <Header />
      <main
        className="content"
        style={{ paddingBottom: isSmallScreen ? '60px' : '0' }}
      >
        {component}
      </main>
      {isSmallScreen ? (
        <>
          <PhoneFooter />
        </>
      ) : (
        <Footer />
      )}
    </div>
  );
};
