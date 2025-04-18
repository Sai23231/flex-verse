import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useNotification } from '../../context/NotificationProvider';
import CustomButton from '../Utils/CustomButton';
import AmenitiesSection from './Amenities';

import type { Gym, HoursOfOperation } from '../Models';

interface GymDetailsProps {
  gymDetail: Gym | undefined;
}

export const GymDetails: React.FC<GymDetailsProps> = (props) => {
  const { showNotification } = useNotification();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const gymDetail = props.gymDetail;

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [selectedMembership, setSelectedMembership] = useState<string>();
  const [hoursOfOperationToday, setHoursOfOperationToday] =
    useState<string>('');

  const handleMembershipChange = (
    event: React.MouseEvent<HTMLElement>,
    newMembership: string
  ) => {
    setSelectedMembership(newMembership);
  };

  const handleGetADayPass = () => {
    navigate('/GetADayPass', { state: { gym: gymDetail } });
  };

  const handleBecomeAMember = () => {
    navigate('/BecomeAMember', { state: { gym: gymDetail } });
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const convert24HourTo12HourTimeString = (timeInListFormat: number[]) => {
    const date = new Date();
    date.setHours(timeInListFormat[0]);
    date.setMinutes(timeInListFormat[1]);
    const timeString = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return timeString;
  };

  useEffect(() => {
    const todaysDate = new Date();
    const todaysDay = dayNames[todaysDate.getDay()];
    gymDetail?.hoursOfOperations.map((hoursOfOperation: HoursOfOperation) => {
      convert24HourTo12HourTimeString(hoursOfOperation.endTime);
      if (hoursOfOperation.day == todaysDay) {
        setHoursOfOperationToday(
          convert24HourTo12HourTimeString(hoursOfOperation.startTime) +
            ' - ' +
            convert24HourTo12HourTimeString(hoursOfOperation.endTime)
        );
      }
    });
  }, []);

  return (
    <Grid
      item
      xs={6}
      md={6}
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ flex: 1 }}>
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
          <LocationOnIcon sx={{ marginRight: 1 }} />
          {gymDetail?.addressLine1 && (
            <div>
              {gymDetail?.addressLine1}, {gymDetail?.addressLine2},
            </div>
          )}
          {gymDetail?.city}, {gymDetail?.state}, {gymDetail?.country},{' '}
          {gymDetail?.zip}
        </Typography>
        {gymDetail?.phoneNumber && (
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
            {gymDetail?.phoneNumber}
          </Typography>
        )}
        {gymDetail?.email && (
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
            <EmailIcon sx={{ marginRight: 1 }} />
            {gymDetail?.email}
          </Typography>
        )}
        <Accordion
          expanded={isExpanded}
          onChange={toggleExpansion}
          sx={{ marginBottom: 2 }}
        >
          {hoursOfOperationToday ? (
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Hours of Operations: Today: {hoursOfOperationToday}
            </AccordionSummary>
          ) : (
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Hours of Operations:
            </AccordionSummary>
          )}
          <AccordionDetails>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {isExpanded &&
                gymDetail?.hoursOfOperations.map((dayInfo: any) => (
                  <div
                    key={dayInfo.day}
                    style={{ display: 'flex', marginBottom: '8px' }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        marginRight: '8px',
                        minWidth: '100px',
                      }}
                    >
                      {dayInfo.day}:
                    </span>
                    {convert24HourTo12HourTimeString(dayInfo.startTime) +
                      ' - ' +
                      convert24HourTo12HourTimeString(dayInfo.endTime)}
                  </div>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* {gymDetail?.membershipOptions.length > 0 && (
          <div>
            <Typography
              variant="h6"
              paddingBottom="5px"
              sx={{ fontWeight: 'bold' }}
            >
              Membership Options
            </Typography>
            <ToggleButtonGroup
              value={selectedMembership}
              exclusive
              onChange={handleMembershipChange}
              aria-label="price-rates"
              sx={{ marginBottom: 2 }}
            >
              {gymDetail?.membershipOptions.map((membershipOption: any) => {
                <ToggleButton
                  value={`$${membershipOption.cost}/${membershipOption.duration}`}
                  aria-label={`$${membershipOption.cost}/${membershipOption.duration}`}
                >
                  ${membershipOption.cost}/{membershipOption.duration}
                </ToggleButton>;
              })}
            </ToggleButtonGroup>
          </div>
        )} */}
      </div>
      <AmenitiesSection amenitiesOptions={gymDetail?.amenities} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: '8px',
            alignItems: 'center',
            marginTop: '16px',
          }}
        >
          <CustomButton onClick={handleGetADayPass}>
            Get A Day Pass
          </CustomButton>
          <CustomButton onClick={handleBecomeAMember}>
            Become a Member
          </CustomButton>
        </div>
      </div>
    </Grid>
  );
};
