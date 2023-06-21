import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import PostsScreen from "../PostScreen/PostsScreen";
import TabNav from "./TabNav";

const MainStack = createStackNavigator();
// const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
  // const headerStyle = {
  //   backgroundColor: "yellow",
  // };
  return (
    <AppWrapper>
      <MainStack.Navigator initialRouteName="PostList">
        <MainStack.Screen
          name="PostList"
          component={PostsScreen}
          options={{
            title: "Публікації",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            },
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Press me"
                color="#fff"
              />
            ),
          }}
        />
        {/* <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false, title: "Start screen" }}
          /> */}
      </MainStack.Navigator>

      <StatusBar style="auto" />
    </AppWrapper>
  );
}

const AppWrapper = styled.View`
  flex: 1;
`;
