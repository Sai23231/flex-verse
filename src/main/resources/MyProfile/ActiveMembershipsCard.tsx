import React, { useEffect, useState } from 'react';

import { Card, CardContent, List, Typography } from '@mui/material';

import { profileApi } from '../../API/ProfileApi';
import { MembershipCard } from './MemebershipCard';

const ActiveMembershipsCard = () => {
  const [activeGymMemberships, setActiveGymMemberships] = useState<any[]>();

  const convertArrayObjToDate = (date: number[]) => {
    const tempDate = new Date();
    tempDate.setFullYear(date[0]);
    tempDate.setMonth(date[1] - 1);
    tempDate.setDate(date[2]);
    return tempDate;
  };
  const generateActiveGymMembershipsList = (gymMemberships: any[]) => {
    const todaysDate = new Date();
    const tempActiveGymMemberships: any[] = [];
    gymMemberships?.map((gymMembership: any) => {
      const gymMembershipEndDate = convertArrayObjToDate(gymMembership.endDate);
      if (todaysDate <= gymMembershipEndDate) {
        tempActiveGymMemberships.push(gymMembership);
      }
    });
    setActiveGymMemberships(tempActiveGymMemberships);
  };

  useEffect(() => {
    profileApi.getMemberships().then((response) => {
      generateActiveGymMembershipsList(response);
    });
  }, []);

  return (
    <Card sx={{ margin: 2, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ marginLeft: '8px' }}>
          <strong>Active Memberships</strong>
        </Typography>
        {activeGymMemberships?.map((gymMembership) => (
          // eslint-disable-next-line react/jsx-key
          <List>
            <MembershipCard gymMembership={gymMembership} isActive={true} />
          </List>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActiveMembershipsCard;
