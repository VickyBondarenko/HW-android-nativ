import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

function MapScreen() {
  const navigation = useNavigation();
  return (
    <MapScreenWrapper>
      <Text>MapScreen</Text>
    </MapScreenWrapper>
  );
}

export default MapScreen;

const MapScreenWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
`;
