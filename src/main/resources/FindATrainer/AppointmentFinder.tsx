import 'react-calendar/dist/Calendar.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Calendar from 'react-calendar';

import { appointmentApi } from '../../API/AppointmentsApi';
import { trainerApi } from '../../API/TrainerApi';

interface Appointment {
  date: Date;
  time: string;
}

interface AppointmentFinderProps {
  trainerId: string;
}

const AppointmentFinder: React.FC<AppointmentFinderProps> = (props) => {
  const navigate = useNavigate();
  const { trainerId } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    trainerApi
      .getAvailableAppointments(trainerId)
      .then((dateStrings) => {
        const appointmentArray = dateStrings.map((dateString) => {
          const date = new Date(dateString);
          return {
            date,
            time: `${date.getHours()}:${date
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
          };
        });
        setAppointments(appointmentArray);
      })
      .catch((error) => {
        console.error('Failed to fetch appointments:', error);
      });
  }, []);

  useEffect(() => {
    const times = appointments
      .filter((app) => app.date.toDateString() === selectedDate.toDateString())
      .map((app) => app.time);

    setAvailableTimes(times);
  }, [selectedDate, appointments]);

  const handleDayClick = (date: Date) => {
    const isInAppointments = appointments.some(
      (app) => app.date.toDateString() === date.toDateString()
    );
    if (isInAppointments) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const isDateDisabled = ({ date }: { date: Date }) => {
    return !appointments.some(
      (app) => app.date.toDateString() === date.toDateString()
    );
  };

  const dateTileClassName = ({ date }: { date: Date }) => {
    return isDateDisabled({ date }) ? 'disabled-date' : '';
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    navigate('/bookAppointment', {
      state: {
        consultantId: trainerId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      },
    });
    setSelectedTime(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3, marginLeft: 0, paddingLeft: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            marginLeft: '15px',
            marginBottom: '5px',
          }}
        >
          <Calendar
            onClickDay={handleDayClick}
            value={selectedDate}
            tileDisabled={isDateDisabled}
            tileClassName={dateTileClassName}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '1rem' }}>
          <Typography variant="h6">Availablility</Typography>
          <List>
            {availableTimes.map((time, index) => (
              <ListItem
                button
                onClick={() => handleTimeClick(time)}
                key={index}
                style={
                  time === selectedTime ? { backgroundColor: 'lightgray' } : {}
                }
              >
                <ListItemText primary={time} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleBookAppointment}
        sx={{ mt: 2 }}
        disabled={selectedTime === null}
      >
        Book Appointment
      </Button>
    </Container>
  );
};

export default AppointmentFinder;
