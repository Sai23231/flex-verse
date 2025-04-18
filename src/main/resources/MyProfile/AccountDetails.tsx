import './ConsultantAccountDetails.css';

import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Mail } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { profileApi } from '../../API/ProfileApi';
import { useNotification } from '../../context/NotificationProvider';

import type { User } from '../Models';
import { setLoggedInUserDetails } from '../../../features/userDetailsSlice';
import { useDispatch } from 'react-redux';

interface AccountDetailsProps {
  userDetails: any;
}

export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
  const userDetail = props.userDetails;
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState(userDetail.firstName);
  const [lastName, setLastName] = useState(userDetail.lastName);
  const [phone, setPhone] = useState(userDetail.phone);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
  };

  const onClickUpdate = () => {
    profileApi
      .editProfile({
        id: userDetail.id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      })
      .then((response: any) => {
        showNotification(true, 'success', 'Profile updated successfully');
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        dispatch(setLoggedInUserDetails(response));
        navigate('/profile');
      })
      .catch((error: any) => {
        showNotification(
          true,
          'success',
          'Profile update error',
          error.response.data
        );
      });
  };

  return (
    <Grid container spacing={2} marginTop={2} paddingLeft={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingRight: '10px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <strong>
            {userDetail?.firstName} {userDetail?.lastName}
          </strong>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {userDetail?.gender}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            borderBottom: '1px solid #ccc',
            paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PhoneIcon sx={{ marginRight: 1 }} />
          {userDetail?.phone}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            borderBottom: '1px solid #ccc',
            paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Mail sx={{ marginRight: 1 }} />
          {userDetail?.email}
        </Typography>
      </Grid>
      <Button onClick={handleOpen}>Edit Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginTop: 4, marginBottom: 4 }}
          >
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
            type="phone"
            variant="outlined"
            color="secondary"
            label="Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            fullWidth
            sx={{ mb: 4 }}
          />
          <Button
            onClick={() => {
              onClickUpdate();
            }}
            variant="outlined"
            color="secondary"
          >
            Update
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};
