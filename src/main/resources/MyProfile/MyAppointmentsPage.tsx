import React, { useEffect, useState } from 'react';

import { appointmentApi } from '../../API/AppointmentsApi';
import { useNotification } from '../../context/NotificationProvider';
import AddAppointments from './AddAppointments';
import AvailableAppointments from './AvailableAppointments';

import type { GroupedAppointment } from './AvailableAppointments';

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<GroupedAppointment[]>([]);
  const { showNotification } = useNotification();

  const handleAppointmentSaved = (selectedDates: any, timeSlots: any) => {
    const addAppointmentRequest = {
      time: timeSlots,
      dates: selectedDates,
    };
    appointmentApi
      .createAppointments(addAppointmentRequest)
      .then((response) => {
        showNotification(true, 'success', 'Appointments Added Successfully');
        setAllAppointments();
      })
      .catch((error) => {
        showNotification(
          true,
          'failed',
          'Error adding appointments',
          error.response.data
        );
      });
  };
  const convertToAppointments = (dateStrings: any) => {
    return dateStrings.map((dateTimeString: any) => {
      const [date, time] = dateTimeString.split('T');
      return { date, timeSlot: time };
    });
  };

  const setAllAppointments = () => {
    appointmentApi.getAllAppointmentsGrouped().then((response) => {
      setAppointments(response);
    });
  };

  useEffect(() => {
    setAllAppointments();
  }, []);

  return (
    <div>
      <AddAppointments onAppointmentSaved={handleAppointmentSaved} />
      <AvailableAppointments appointments={appointments} />
    </div>
  );
};

export default MyAppointmentsPage;
