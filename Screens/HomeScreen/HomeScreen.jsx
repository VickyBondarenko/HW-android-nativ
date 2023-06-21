import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import styled from "styled-components/native";
import PostsScreen from "../PostScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CreatePostScreen from "../CreatePostsScreen/CreatePostsScreen";

// const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "PostsList") {
            iconName = focused ? "ios-grid" : "ios-grid-outline";
          } else if (route.name === "CreatePostScreen") {
            iconName = "ios-add-sharp";
          } else if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{
                backgroundColor: focused ? "#FF6C00" : "transparent",
                borderRadius: 20,
                paddingTop: 8,
                paddingLeft: 23,
                paddingBottom: 8,
                paddingRight: 23,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          alignItems: "center",
          paddingTop: 9,
          paddingLeft: 90,
          paddingBottom: 34,
          paddingRight: 90,
        },
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="PostsList" component={PostsScreen} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tabs.Screen name="CreatePostScreen" component={CreatePostScreen} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AppWrapper = styled.View`
  flex: 1;
`;
