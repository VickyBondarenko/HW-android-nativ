import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import HomeStack from "./Stacks/HomeStack";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppWrapper>
            <MainStack.Navigator initialRouteName="Login">
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
      </PersistGate>
    </Provider>
  );
}

const AppWrapper = styled.View`
  flex: 1;
`;
