import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { paymentApi } from '../../API/PaymentApi';
import { loadStripe } from '@stripe/stripe-js';

const BookAppointmentPage = () => {
  const location = useLocation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const appointmentDate = location.state.appointmentDate;
  const appointmentTime = location.state.appointmentTime;
  const consultantId = location.state.consultantId;

  const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  if (!stripeKey) {
    throw new Error(
      'Missing Stripe Publishable Key. Please check your .env file.'
    );
  }

  const stripePromise = loadStripe(stripeKey);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    let paymentIntentId = '';
    let appointmentId = '';

    paymentApi
      .initiatePayment(
        firstName,
        email,
        consultantId,
        appointmentDate,
        appointmentTime
      )
      .then((response) => {
        const paymentUrl = response.paymentUrl;
        paymentIntentId = response.paymentIntentId;
        appointmentId = response.appointmentId;

        if (!paymentUrl || !paymentIntentId || !appointmentId) {
          throw new Error('Invalid payment response received.');
        }

        localStorage.setItem('appointmentId', appointmentId);
        localStorage.setItem('paymentIntentId', paymentIntentId);
        localStorage.setItem('appointmentDate', appointmentDate);
        localStorage.setItem('appointmentTime', appointmentTime);
        localStorage.setItem('consultantId', consultantId);

        window.location.href = paymentUrl;
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof Error ? error.message : 'Something went wrong.'
        );
        console.error('Error during payment initiation:', error);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <h2>Book Appointment</h2>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="phone"
          variant="outlined"
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Appointment Date"
          value={appointmentDate}
          fullWidth
          disabled
          sx={{ mb: 4 }}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Appointment Time"
          value={appointmentTime}
          fullWidth
          disabled
          sx={{ mb: 4 }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Book Appointment & Pay'}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default BookAppointmentPage;
