import 'react-calendar/dist/Calendar.css';

import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Calendar from 'react-calendar';

interface TimeSlot {
  from: string;
  to: string;
}

interface AddAppointmentsProps {
  onAppointmentSaved: (arg0: any, arg1: any) => void;
}

const AddAppointments: React.FC<AddAppointmentsProps> = ({
  onAppointmentSaved,
}) => {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  const minutes = ['00', '30'];

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, slotIndex) => slotIndex !== index));
  };

  const buildTimeString = (hour: any, minute: any) => `${hour}:${minute}`;

  const handleTimeChange = (value: any, timeType: any) => {
    const [hour, minute] = value.split(':');
    const timeString = buildTimeString(hour, minute);

    if (timeType === 'from') {
      setFromTime(timeString);
    } else {
      setToTime(timeString);
    }
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(
      (selectedDate) =>
        selectedDate.getFullYear() === date.getFullYear() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getDate() === date.getDate()
    );
  };

  const handleAddTimeSlot = () => {
    if (fromTime === '' || toTime === '') {
      alert('Both "From" and "To" times are required.');
      return;
    }
    if (toTime <= fromTime) {
      alert('"To" time must be after "From" time.');
      return;
    }
    setTimeSlots([...timeSlots, { from: fromTime, to: toTime }]);
    setFromTime('');
    setToTime('');
  };

  const handleSelectDates = () => {
    setShowCalendarModal(true);
  };

  const handleDateChange = (value: any) => {
    // Check if the value is an array and handle the first element (for range selection)
    // or a single Date object (for single date selection)
    const selectedDate = Array.isArray(value) ? value[0] : value;

    const selectedIndex = selectedDates.findIndex(
      (d) =>
        d.getFullYear() === selectedDate.getFullYear() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getDate() === selectedDate.getDate()
    );

    if (selectedIndex > -1) {
      // Remove the date if it's already selected
      setSelectedDates(selectedDates.filter((_, idx) => idx !== selectedIndex));
    } else {
      // Add the new date to the selected dates
      setSelectedDates([...selectedDates, selectedDate]);
    }
  };

  const handleSave = () => {
    setShowCalendarModal(false);
    if (onAppointmentSaved) {
      onAppointmentSaved(selectedDates, timeSlots);
    }
  };

  return (
    <Grid container spacing={2} marginTop={2} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>Add Appointments</strong>
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>From Time</InputLabel>
          <Select
            value={fromTime}
            onChange={(e) => handleTimeChange(e.target.value, 'from')}
            label="From Time"
          >
            {hours.map((hour) =>
              minutes.map((minute) => (
                <MenuItem key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
                  {`${hour}:${minute}`}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>To Time</InputLabel>
          <Select
            value={toTime}
            onChange={(e) => handleTimeChange(e.target.value, 'to')}
            label="To Time"
          >
            {hours.map((hour) =>
              minutes.map((minute) => (
                <MenuItem key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
                  {`${hour}:${minute}`}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={handleAddTimeSlot}>
          Add Time Slot To List
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSelectDates}>
          Select Dates
        </Button>
      </Grid>

      {timeSlots.map((slot, index) => (
        <Grid container item xs={12} key={index} alignItems="center">
          <Typography
            sx={{ flexGrow: 1 }}
          >{`From: ${slot.from}, To: ${slot.to}`}</Typography>
          <IconButton onClick={() => handleRemoveTimeSlot(index)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      ))}

      <Modal
        open={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Selected Time Slots:</Typography>
          {timeSlots.map((slot, index) => (
            <Typography
              key={index}
            >{`From: ${slot.from}, To: ${slot.to}`}</Typography>
          ))}
          <Calendar
            onChange={handleDateChange}
            tileClassName={({ date, view }) =>
              view === 'month' && isDateSelected(date) ? 'selected' : null
            }
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
            Save Appointment
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default AddAppointments;
