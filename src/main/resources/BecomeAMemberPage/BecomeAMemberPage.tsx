import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Stack,
  Autocomplete,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { MembershipOption } from '../Models';

const BecomeAMemberPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipOptionId, setMembershipOptionId] = useState('');
  const [startDate, setStartDate] = useState('');

  const location = useLocation();
  const gym = location.state.gym;

  const initiatePayment = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/checkout/become-a-member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            name: 'test name',
            id: 'test id',
          },
        ],
        customerName: firstName,
        customerEmail: email,
        gymId: gym.id,
        membershipOptionId: membershipOptionId,
        startDate: startDate,
      }),
    })
      .then((r) => r.text())
      .then((r) => {
        window.location.href = r;
      });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    initiatePayment();
  }

  const handleSelectMembershipOption = (event: any, value: any) => {
    setMembershipOptionId(value.id);
  };

  return (
    <React.Fragment>
      <h2>Day Pass Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
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
          color="secondary"
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
          color="secondary"
          label="Phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <Autocomplete
          options={gym.membershipOptions}
          getOptionLabel={(option: MembershipOption) =>
            `${option.duration} -- $${option.cost}`
          }
          onChange={handleSelectMembershipOption}
          sx={{ backgroundColor: 'white', width: 500, mr: 8 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              color="primary"
              placeholder="Membership options"
              sx={{ borderRadius: 10, mb: 4 }}
              required
            />
          )}
        />
        <TextField
          type="date"
          variant="outlined"
          color="secondary"
          label=""
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
      {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
    </React.Fragment>
  );
};

export default BecomeAMemberPage;
