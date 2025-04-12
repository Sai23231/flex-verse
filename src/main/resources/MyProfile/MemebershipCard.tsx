import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
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

import type { Gym } from '../Models';
import { gymApi } from '../../API/GymApi';
import { useNotification } from '../../context/NotificationProvider';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column', // Use column layout for smaller screens
  alignItems: 'stretch', // Stretch content to fill the container
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

interface MembershipCardProps {
  isActive: boolean;
  gymMembership: any;
}

export const MembershipCard: React.FC<MembershipCardProps> = (props) => {
  const { isActive } = props;
  const { gymMembership } = props;
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [reviewDescription, setReviewDescription] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { showNotification } = useNotification();

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

  const navigate = useNavigate();
  const goToGymDetailsPage = (gym: Gym) => {
    navigate('/gymDetails', {
      state: {
        gymId: gym.id,
      },
    });
  };
  const onClickSubmitReview = (gym: Gym) => {
    gymApi
      .submitReview({
        id: gym.id,
        rating: ratingValue,
        review: reviewDescription,
      })
      .then((response: any) => {
        showNotification(true, 'success', 'Profile updated successfully');
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

  const convertArrayObjToDateString = (date: number[]) => {
    const tempDate = new Date();
    tempDate.setFullYear(date[0]);
    tempDate.setMonth(date[1] - 1);
    tempDate.setDate(date[2]);
    return tempDate.toDateString();
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledListItem>
      {isSmallScreen && <Typography variant="h6">Gym Name</Typography>}
      {!isSmallScreen && (
        <ListItemText
          primaryTypographyProps={{ variant: 'h6' }}
          primary="Gym Name"
          secondary={
            <>
              <StyledTextSecondary variant="body2" color="textSecondary">
                Start Date:{' '}
                {convertArrayObjToDateString(gymMembership.startDate)}
              </StyledTextSecondary>
              <StyledTextSecondary variant="body2" color="textSecondary">
                End Date: {convertArrayObjToDateString(gymMembership.endDate)}
              </StyledTextSecondary>
              <StyledTextSecondary variant="body2" color="textSecondary">
                Total Cost: $180
              </StyledTextSecondary>
            </>
          }
        />
      )}
      <StyledButtonContainer>
        <StyledButton
          variant="contained"
          size="large"
          onClick={() => goToGymDetailsPage(gymMembership.gym)}
        >
          Gym Page
        </StyledButton>
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
            onChange={(event, newValue) => {
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
              onClickSubmitReview(gymMembership.gym);
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
