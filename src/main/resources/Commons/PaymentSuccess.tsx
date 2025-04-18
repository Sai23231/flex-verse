import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentApi } from '../../API/AppointmentsApi';
import { CircularProgress, Typography, Box } from '@mui/material';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Confirming appointment...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appointmentId = localStorage.getItem('appointmentId');
    const paymentIntentId = localStorage.getItem('paymentIntentId');

    if (!appointmentId || !paymentIntentId) {
      setMessage('Missing payment or appointment details.');
      setLoading(false);
      return;
    }

    appointmentApi
      .confirmAppointment(appointmentId, paymentIntentId)
      .then(() => {
        localStorage.removeItem('appointmentId');
        localStorage.removeItem('paymentIntentId');
        localStorage.removeItem('appointmentDate');
        localStorage.removeItem('appointmentTime');
        localStorage.removeItem('consultantId');

        setMessage(
          'Appointment confirmed! Please check profile page for details.'
        );
        setLoading(false);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        setMessage('Failed to confirm appointment.');
        console.error('Error confirming appointment:', error);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {loading && <CircularProgress size={50} sx={{ mb: 2 }} />}
      <Typography variant="h6" color="primary">
        {message}
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
