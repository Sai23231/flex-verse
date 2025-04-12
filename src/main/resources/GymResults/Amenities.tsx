import React from 'react';

import { Fireplace } from '@mui/icons-material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LockIcon from '@mui/icons-material/Lock';
import PoolIcon from '@mui/icons-material/Pool';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import WifiIcon from '@mui/icons-material/Wifi';
import { Grid, Typography } from '@mui/material';

import type { Amenities } from '../Models';

interface AmenitiesSectionProps {
  amenitiesOptions: Amenities[] | undefined;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = (props) => {
  const { amenitiesOptions } = props;
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Amenities
      </Typography>
      <Grid container spacing={2}>
        {amenitiesOptions?.map((amenity) => (
          <Grid key={amenity.name} item xs={3}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              {amenity.name == 'Weights' && <FitnessCenterIcon />}
              {amenity.name == 'Sauna' && <Fireplace />}
              {amenity.name == 'Lockers' && <LockIcon />}
              {amenity.name == 'Snack Bar' && <FastfoodIcon />}
              {amenity.name == 'Juice Bar' && <LocalCafeIcon />}
              {amenity.name == 'Swimming Pool' && <PoolIcon />}
              {amenity.name == 'Crossfit Equipments' && <FitnessCenterIcon />}
              {amenity.name == 'Cardio Area' && <RunCircleIcon />}
              {amenity.name == 'WiFi' && <WifiIcon />}
              {amenity.name == 'Squat Rack' && <RunCircleIcon />}
              {amenity.name == 'Parking' && <LocalParkingIcon />}
              {amenity.name == 'Yoga Space' && <SelfImprovementIcon />}
              {amenity.name == 'Complimentary toiletries' && <TagFacesIcon />}
              <span>{amenity.name}</span>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AmenitiesSection;
