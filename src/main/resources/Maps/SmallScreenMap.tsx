import React, { useMemo } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
};

export const SmallScreenMap = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const mapHeight = isSmallScreen ? '25vh' : '100%';
  const padding = isSmallScreen ? '16px' : '0';

  return (
    <div style={{ padding, boxSizing: 'border-box' }}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{
          ...mapContainerStyle,
          height: mapHeight,
        }}
      >
        <Marker
          position={{ lat: 44, lng: -80 }}
          icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
        />
      </GoogleMap>
    </div>
  );
};
