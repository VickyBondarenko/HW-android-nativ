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
import { useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { PROVIDER_GOOGLE } from "react-native-maps";

provider = PROVIDER_GOOGLE;

const MapScreen = () => {
  const {
    params: { location, position },
  } = useRoute();

  return (
    <MapWrapper>
      <MapView
        style={styles.mapStyle}
        region={{
          ...position,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log({ location, position })}
      >
        {position && (
          <Marker
            title={location}
            coordinate={position}
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
