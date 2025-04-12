import React, { useEffect, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  List,
  Pagination,
  Typography,
} from '@mui/material';

import { profileApi } from '../../API/ProfileApi';
import { MembershipCard } from './MemebershipCard';

const PreviousMembershipsCard = () => {
  const itemsPerPage = 4;
  const totalItems = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const [previousGymMemberships, setPreviousGymMemberships] = useState<any[]>();

  const convertArrayObjToDate = (date: number[]) => {
    const tempDate = new Date();
    tempDate.setFullYear(date[0]);
    tempDate.setMonth(date[1] - 1);
    tempDate.setDate(date[2]);
    return tempDate;
  };
  const generatePreviousGymMembershipsList = (gymMemberships: any[]) => {
    const todaysDate = new Date();
    const tempPreviousGymMemberships: any[] = [];
    gymMemberships?.map((gymMembership: any) => {
      const gymMembershipEndDate = convertArrayObjToDate(gymMembership.endDate);
      if (todaysDate > gymMembershipEndDate) {
        tempPreviousGymMemberships.push(gymMembership);
      }
    });
    setPreviousGymMemberships(tempPreviousGymMemberships);
  };

  useEffect(() => {
    profileApi.getMemberships().then((response) => {
      generatePreviousGymMembershipsList(response);
    });
  }, []);

  const handlePageChange = (
    _event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Card sx={{ margin: 2, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ marginLeft: '8px' }}>
          <strong>Previous Memberships</strong>
        </Typography>
        {previousGymMemberships?.map((gymMembership) => (
          // eslint-disable-next-line react/jsx-key
          <List>
            <MembershipCard gymMembership={gymMembership} isActive={true} />
          </List>
        ))}
      </CardContent>
    </Card>
  );
};

export default PreviousMembershipsCard;
