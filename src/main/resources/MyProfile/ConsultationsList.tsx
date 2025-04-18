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
import {
  activeConsultationStatus,
  completedConsultationStatuses,
  consultationsPerPage,
} from '../../constants/Constants';
import { ConsultationCard } from './ConsultationCard';

import type { Appointments } from '../Models';

interface ConsultationsListProps {
  totalItems: number;
  activeConsultations: boolean;
  completedOrCancelledConsultations: boolean;
  loggedInUserRole: string;
}

const ConsultationsList: React.FC<ConsultationsListProps> = (props) => {
  const {
    totalItems,
    activeConsultations,
    completedOrCancelledConsultations,
    loggedInUserRole,
  } = props;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (completedOrCancelledConsultations) {
      profileApi
        .getConsultations(
          currentPage,
          completedConsultationStatuses,
          loggedInUserRole
        )
        .then((response) => {
          setAppointments(response);
        });
    } else {
      if (activeConsultations) {
        profileApi
          .getConsultations(
            currentPage,
            activeConsultationStatus,
            loggedInUserRole
          )
          .then((response) => {
            setAppointments(response);
          });
      }
    }
  }, []);

  const handlePageChange = (
    _event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * consultationsPerPage;
  const endIndex = startIndex + consultationsPerPage;

  return (
    <Card sx={{ margin: 2, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ marginLeft: '8px' }}>
          {activeConsultations ? (
            <strong>Active Consultations</strong>
          ) : (
            <strong>Previous Consultations</strong>
          )}
        </Typography>
        <List>
          {appointments.map((appointment, index) => (
            <ConsultationCard
              key={index}
              isActive={activeConsultations}
              appointment={appointment}
              loggedInUserRole={loggedInUserRole}
            />
          ))}
        </List>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalItems / consultationsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ marginTop: 2, justifyContent: 'center' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConsultationsList;
