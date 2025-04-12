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
import { useDispatch } from 'react-redux';

import { setLoggedInUserDetails } from '../../../features/userDetailsSlice';
import { consultantApi } from '../../API/ConsultantApi';
import { useNotification } from '../../context/NotificationProvider';

import type { Consultant, User } from '../Models';

interface ConsultantAccountDetailsProps {
  userDetails: any;
}

export const ConsultantAccountDetails: React.FC<
  ConsultantAccountDetailsProps
> = (props) => {
  const consultantDetail = props.userDetails;
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState(consultantDetail.firstName);
  const [lastName, setLastName] = useState(consultantDetail.lastName);
  const [phone, setPhone] = useState(consultantDetail.phone);
  const [bio, setBio] = useState(consultantDetail.bio);
  const [shortBio, setShortBio] = useState(consultantDetail.shortBio);
  const [city, setCity] = useState(consultantDetail.city);
  const [state, setState] = useState(consultantDetail.state);
  const [country, setCountry] = useState(consultantDetail.country);
  const [zip, setZip] = useState(consultantDetail.zip);
  const [pricePerConsultation, setPricePerConsultation] = useState(
    consultantDetail.pricePerConsultation
  );
  const [streetAddress, setStreetAddress] = useState(
    consultantDetail.streetAddress
  );
  const [addressLine2, setAddressLine2] = useState(
    consultantDetail.addressLine2
  );

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
    consultantApi
      .editProfile({
        id: consultantDetail.id,
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        shortBio: shortBio,
        phone: phone,
        city: city,
        state: state,
        country: country,
        zip: zip,
        pricePerConsultation: pricePerConsultation,
        streetAddress: streetAddress,
        addressLine2: addressLine2,
      })
      .then((response) => {
        showNotification(true, 'success', 'Profile updated successfully');
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        dispatch(setLoggedInUserDetails(response));
        navigate('/consultantProfile');
      })
      .catch((error) => {
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
            {consultantDetail?.firstName} {consultantDetail?.lastName}
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
          {consultantDetail?.gender}
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
          {consultantDetail?.phone}
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
          {consultantDetail?.email}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            // marginBottom: 2,
            borderBottom: '1px solid #ccc',
            paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HomeIcon sx={{ marginRight: 1 }} />
          {consultantDetail?.streetAddress}, {consultantDetail?.addressLine2}
          <br></br>
          {consultantDetail?.city}, {consultantDetail?.state},{' '}
          {consultantDetail?.zip}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            borderBottom: '1px solid #ccc',
            // paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <dl>
            <dt>Short Bio</dt>
            <dd>{consultantDetail?.shortBio}</dd>
          </dl>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            borderBottom: '1px solid #ccc',
            // paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <dl>
            <dt>Bio</dt>
            <dd>{consultantDetail?.bio}</dd>
          </dl>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            borderBottom: '1px solid #ccc',
            // paddingBottom: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <dl>
            <dt>Specializations</dt>
            <dd>
              <ul>
                {consultantDetail?.specializations.map(
                  (specialization: {
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    // eslint-disable-next-line react/jsx-key
                  }) => <li>{specialization.title}</li>
                )}
              </ul>
            </dd>
          </dl>
        </Typography>
      </Grid>
      <Button onClick={handleOpen}>Edit profile</Button>
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
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Enter your Bio!"
            multiline
            rows={4}
            maxRows={4}
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Short bio"
            onChange={(e) => setShortBio(e.target.value)}
            value={shortBio}
            placeholder="Enter your introductory bio!"
            multiline
            rows={3}
            maxRows={3}
            fullWidth
            sx={{ mb: 4 }}
          />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Address Line 1"
              onChange={(e) => setStreetAddress(e.target.value)}
              value={streetAddress}
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Address Line 2"
              onChange={(e) => setAddressLine2(e.target.value)}
              value={addressLine2}
              fullWidth
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              fullWidth
            />
          </Stack>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Zipcode"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
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
