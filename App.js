import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import HomeStack from "./Stacks/HomeStack";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppWrapper>
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
        <StatusBar style="auto" />
      </AppWrapper>
    </NavigationContainer>
  );
}

const AppWrapper = styled.View`
  flex: 1;
`;
