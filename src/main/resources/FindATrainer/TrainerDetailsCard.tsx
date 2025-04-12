import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { trainerApi } from '../../API/TrainerApi';
import { useNotification } from '../../context/NotificationProvider';
import { Reviews } from '../Reviews/Reviews';
import { renderRatingStars } from '../Utils/RenderRatingStars';
import { TabPanel } from '../Utils/TabPanel';
import AppointmentFinder from './AppointmentFinder';

import type { Trainer } from '../Models';

interface TrainerDetailsCardProps {
  trainerId?: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const defaultTrainer: Trainer = {
  id: '1',
  firstName: 'Default Name',
  lastName: 'Default Name',
  sex: 'Not Specified',
  city: 'Default',
  state: 'Default',
  country: 'Default',
  bio: 'Default',
  shortBio: 'Default',
  specializations: [],
  description: 'Default Description',
  certifications: [],
  averageRating: 0,
  totalRatings: 0,
};

export const TrainerDetailsCard: React.FC<TrainerDetailsCardProps> = (
  props
) => {
  const { trainerIdParams } = useParams();
  const trainerId = props.trainerId || trainerIdParams || '';
  const [trainer, setTrainer] = useState<Trainer>(defaultTrainer);
  const [currentStep, setCurrentStep] = useState(0);
  const { showNotification } = useNotification();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentStep(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (trainerId != '')
      trainerApi
        .getTrainerDetails(trainerId)
        .then((response) => setTrainer(response))
        .catch((error) => {
          showNotification(
            true,
            'success',
            'Error Fetching Data',
            error.response.data
          );
        });
  }, [trainerId]);

  return trainerId != '' ? (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        margin: '10px',
        padding: '10px',
        overflowY: 'auto',
      }}
    >
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <CardMedia
            component="img"
            height={isSmallScreen ? '150' : '250'}
            image={`${process.env.REACT_APP_BACKEND_URL}/consultant/${trainerId}/image`}
            sx={{
              margin: '10px',
              height: isSmallScreen ? '200px' : '400px',
              width: '95%',
              borderRadius: '8px',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <CardContent>
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  marginLeft: '8px',
                  textAlign: isSmallScreen ? 'center' : 'left',
                }}
              >
                <strong>
                  {' '}
                  {trainer.firstName} {trainer.lastName}{' '}
                </strong>
              </Typography>
              <Grid
                container
                alignItems={isSmallScreen ? 'center' : 'flex-start'}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {renderRatingStars(trainer.averageRating)}
                  <Typography
                    marginLeft={isSmallScreen ? '0' : '10px'}
                    sx={{
                      display: isSmallScreen ? 'block' : 'inline',
                      verticalAlign: 'top',
                    }}
                  >
                    {!trainer.totalRatings || trainer.totalRatings === 0
                      ? '0 reviews'
                      : `${trainer.averageRating.toFixed(2)} stars from ${
                          trainer.totalRatings
                        } ratings`}
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  borderBottom: 1,
                  border: 'none',
                  paddingBottom: '16px',
                  overflowX: 'auto',
                }}
              >
                <Tabs
                  value={currentStep}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="About" {...a11yProps(0)} />
                  <Tab label="Certifications" {...a11yProps(1)} />
                  <Tab label="Specialization" {...a11yProps(4)} />
                </Tabs>
              </Box>

              <TabPanel value={currentStep} index={0}>
                <div style={{ marginLeft: '20px' }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Address:</strong> {trainer.city}, {trainer.state},{' '}
                    {trainer.country}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Website:</strong>{' '}
                    <Link href="www.google.com" color="primary">
                      www.google.com
                    </Link>
                  </Typography>
                </div>
              </TabPanel>
              <TabPanel value={currentStep} index={1}>
                <ul style={{ marginTop: '-8px', marginBottom: '8px' }}>
                  {trainer.certifications.map((cert, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>{cert.title}</strong> - {cert.certifyingBody}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </TabPanel>
              <TabPanel value={currentStep} index={2}>
                <ul style={{ marginTop: '-8px', marginBottom: '8px' }}>
                  {trainer.specializations.map((specialization, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>{specialization.title}</strong>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        <strong>About me:</strong>
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {trainer.bio}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>Book consultation:</strong>
      </Typography>
      <AppointmentFinder trainerId={trainerId} />
      <Reviews consultantId={trainerId} totalReviews={trainer.totalRatings} />
    </Card>
  ) : (
    <></>
  );
};
