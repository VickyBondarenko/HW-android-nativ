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
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "PostsList") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePostScreen") {
            iconName = "ios-add-sharp";
          } else if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: { alignItems: "center" },
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
