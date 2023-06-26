import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import styled from "styled-components/native";
import { PROVIDER_GOOGLE } from "react-native-maps";

// const { GOOGLE_MAPS_API_KEY } = process.env;
provider = PROVIDER_GOOGLE;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    let locationSubscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        async (newLocation) => {
          const coords = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          };
          setLocation(coords);

          const geocode = await Location.reverseGeocodeAsync(coords);
          if (geocode.length > 0) {
            const { city } = geocode[0];
            setPlaceName(city);
          }
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <MapWrapper>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log({ location })}
        // onRegionChange={() => console.log("Region change")}
      >
        {location && (
          <Marker
            title={placeName !== "" ? placeName : "I am here"}
            coordinate={location}
            description="Photo location"
          />
        )}
      </MapView>
    </MapWrapper>
  );
};

const MapWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
