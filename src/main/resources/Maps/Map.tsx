import { useMemo, useState } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '100%',
  minHeight: '620px',
};

export const Map = () => {
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const markers = [
    { id: 1, address: 'Address1', lat: 18.5204, lng: 73.8567 },
    { id: 2, address: 'Address2', lat: 18.5314, lng: 73.8446 },
    { id: 3, address: 'Address3', lat: 18.5642, lng: 73.7769 },
  ];

  const onMapLoad = (map: any) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  return (
    <GoogleMap
      onLoad={onMapLoad}
      zoom={10}
      center={center}
      mapContainerStyle={mapContainerStyle}
    >
      {/* <Marker position={{ lat: 44, lng: -80 }} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} /> */}
      {markers.map(({ id, lat, lng }) => (
        <MarkerF
          key={id}
          position={{ lat, lng }}
          icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
        />
      ))}
    </GoogleMap>
  );
};
