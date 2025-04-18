import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemText,
  Modal,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNotification } from '../../context/NotificationProvider';
import { consultantApi } from '../../API/ConsultantApi';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
}));

const StyledTextSecondary = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const StyledButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9d9fa1',
  color: '#fff',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  marginBottom: theme.spacing(1),
  fontSize: '14px',
  padding: theme.spacing(1, 2),
}));

interface ConsultationCardProps {
  isActive: boolean;
  appointment: any;
  loggedInUserRole: string;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = (props) => {
  const { isActive, appointment, loggedInUserRole } = props;
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [reviewDescription, setReviewDescription] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const goToProfilePage = (consultantId: number) => {
    navigate(`/trainerDetails/${consultantId}`);
  };
  const convertArrayObjToDateString = (date: number[]) => {
    const tempDate = new Date();
    tempDate.setFullYear(date[0]);
    tempDate.setMonth(date[1] - 1);
    tempDate.setDate(date[2]);
    return tempDate.toDateString();
  };
  const convertArrayObjToTimeString = (date: number[]) => {
    return `${date[3]}:${date[4]}`;
  };
  const onClickSubmitReview = (consultant: any) => {
    consultantApi
      .submitReview({
        id: consultant.id,
        rating: ratingValue,
        review: reviewDescription,
      })
      .then((response: any) => {
        showNotification(true, 'success', 'Review submitted successfully');
        handleClose();
      })
      .catch((error: any) => {
        showNotification(
          true,
          'success',
          'Review not able to submit error',
          error.response.data
        );
      });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
  };

  return (
    <StyledListItem>
      {isSmallScreen && (
        <Typography variant="h6">
          {loggedInUserRole == 'CONSULTANT'
            ? `${appointment.appUser.firstName} ${appointment.appUser.lastName}`
            : `${appointment.consultant.firstName} ${appointment.consultant.lastName}`}
        </Typography>
      )}
      {!isSmallScreen && (
        <StyledAvatar src="avatar-image-url.jpg" alt="Gym Avatar" />
      )}
      <ListItemText
        primaryTypographyProps={{ variant: 'h6' }}
        primary={
          loggedInUserRole == 'CONSULTANT'
            ? `${appointment.appUser.firstName} ${appointment.appUser.lastName}`
            : `${appointment.consultant.firstName} ${appointment.consultant.lastName}`
        }
        secondary={
          <>
            <StyledTextSecondary variant="body2" color="textSecondary">
              {convertArrayObjToDateString(appointment.datetime)}
            </StyledTextSecondary>
            {convertArrayObjToTimeString(appointment.datetime) != '0:0' ? (
              <StyledTextSecondary variant="body2" color="textSecondary">
                {convertArrayObjToTimeString(appointment.datetime)}
              </StyledTextSecondary>
            ) : (
              ''
            )}
          </>
        }
      />
      <StyledButtonContainer>
        {loggedInUserRole == 'CONSULTANT' ? (
          ''
        ) : (
          <StyledButton
            variant="contained"
            size="large"
            onClick={() => goToProfilePage(appointment.consultant.id)}
          >
            Consultant Profile
          </StyledButton>
        )}
        <StyledButton variant="contained" size="large" onClick={handleOpen}>
          Leave A Review
        </StyledButton>
      </StyledButtonContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave review
          </Typography>
          <Typography sx={{ marginTop: 3 }} component="legend">
            Rating
          </Typography>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue: number | null) => {
              setRatingValue(newValue);
            }}
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Enter any comments or review description!"
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Enter any comments or review description!"
            multiline
            rows={4}
            maxRows={4}
            fullWidth
            sx={{ mt: 3, mb: 4 }}
          />
          <Button
            onClick={() => {
              onClickSubmitReview(appointment.consultant);
            }}
            variant="outlined"
            color="secondary"
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </StyledListItem>
  );
};
