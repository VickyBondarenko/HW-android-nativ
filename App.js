import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import styled from "styled-components/native";

export default function App() {
  return (
    <AppWrapper>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </AppWrapper>
  );
}

const AppWrapper = styled.View`
  flex: 1;
`;
