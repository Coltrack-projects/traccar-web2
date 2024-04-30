import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useDispatch, useSelector } from 'react-redux';
// import MapView from '../map/core/MapView';
// import MapSelectedDevice from '../map/main/MapSelectedDevice';
// import MapAccuracy from '../map/main/MapAccuracy';
// import MapGeofence from '../map/MapGeofence';
// import MapCurrentLocation from '../map/MapCurrentLocation';
// import PoiMap from '../map/main/PoiMap';
// import MapPadding from '../map/MapPadding';
// import { devicesActions } from '../store';
// import MapDefaultCamera from '../map/main/MapDefaultCamera';
// import MapLiveRoutes from '../map/main/MapLiveRoutes';
// import MapPositions from '../map/MapPositions';
// import MapOverlay from '../map/overlay/MapOverlay';
// import MapGeocoder from '../map/geocoder/MapGeocoder';
// import MapScale from '../map/MapScale';
// import MapNotification from '../map/notification/MapNotification';
// import useFeatures from '../common/util/useFeatures';
import { useAttributePreference } from '../common/util/preferences';
import GoogleMapsPositions from './GoogleMapsPositions';

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const MainMap = ({ filteredPositions, selectedPosition, onEventsClick }) => {
  // const theme = useTheme();
  // const dispatch = useDispatch();

  // const desktop = useMediaQuery(theme.breakpoints.up('md'));

  // const eventsAvailable = useSelector((state) => !!state.events.items.length);

  // const features = useFeatures();

  // const googleMapsApiKey = useAttributePreference('googleMapsApiKey');
  const selectZoom = useAttributePreference("web.selectZoom", 15);

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(selectZoom);
  const [map, setMap] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (selectedPosition && map) {
      map.panTo({
        lat: +selectedPosition.latitude,
        lng: +selectedPosition.longitude,
      });
    }
  }, [selectedPosition])

  useEffect(() => {
    if (!initialized && filteredPositions?.length && map) {
      const coordinates = filteredPositions.map((item) => ({
        lat: +item.latitude,
        lng: +item.longitude,
      }));

      if (coordinates?.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        coordinates.forEach((coordinate) => {
          bounds.extend(coordinate);
        });

        map?.fitBounds(bounds, {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        });

        setZoom(() => map.zoom);
        setInitialized(() => true);
      }
      else if (coordinates?.length === 1) {
        setCenter(() => coordinates[0]);
        setZoom(() => selectZoom);
        setInitialized(() => true);
      }
    }
  }, [filteredPositions, initialized, map]);

  const handleZoomChanged = () => {
    if (map) {
      setZoom(() => map.zoom);
    }
  };

  return (
    <>
      {/* <LoadScript googleMapsApiKey={googleMapsApiKey}> */}
      <LoadScript googleMapsApiKey={'AIzaSyAoGeQsdumMma9OYV-w5_7mlPcVC8rYUeA'}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={center}
          zoom={zoom}
          onLoad={(map) => setMap(map)}
          onZoomChanged={handleZoomChanged}
        >
          {map && (
            <>
              <GoogleMapsPositions
                filteredPositions={filteredPositions}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
      {/* <MapScale />
      <MapCurrentLocation />
      <MapGeocoder />
      {!features.disableEvents && (
        <MapNotification enabled={eventsAvailable} onClick={onEventsClick} />
      )}
      {desktop && (
        <MapPadding left={parseInt(theme.dimensions.drawerWidthDesktop, 10)} />
      )} */}
    </>
  );
};

export default MainMap;
