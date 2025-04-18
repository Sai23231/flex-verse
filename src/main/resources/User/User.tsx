import React from 'react';
import Featured from './components/Featured';
import Testimonials from './components/Testimonials';
import FindSection from './components/FindSection';
import UserFooter from './components/UserFooter';

function User() {
  return (
    <>
      {/* Sidebar will be added here with fixed position */}
      <Featured />
      <Testimonials />
      <FindSection />
      <UserFooter />
    </>
  );
}

export default User;