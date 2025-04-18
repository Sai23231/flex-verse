import React from 'react';

import ActiveMembershipsCard from './ActiveMembershipsCard';
import PreviousMembershipsCard from './PreviousMembershipsCard';

const GymMemberships = () => {
  return (
    <div>
      <ActiveMembershipsCard />
      <PreviousMembershipsCard />
    </div>
  );
};

export default GymMemberships;
