import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// import handleSignOut from "../helpers/LogOut";
import styled from "styled-components/native";
import PostsScreen from "../Screens/PostScreen/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import CreatePostScreen from "../Screens/CreatePostsScreen/CreatePostsScreen";
import LogoutSvg from "../assets/svg/log-out.svg";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config";

const Tabs = createBottomTabNavigator();

export default function PostStack() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Tabs.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          borderBottomColor: "#E8E8E8",
          borderBottomWidth: 1,
          height: 88,
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#212121",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: -0.408,
        },
        headerLeft: () => {
          if (route.name === "CreatePostScreen") {
            return (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="ios-arrow-back" size={24} color="#212121" />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
        tabBarStyle: {
          height: 60,
          paddingRight: 90,
          paddingLeft: 90,
          paddingTop: 9,
          paddingBottom: 0,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "PostsList") {
            iconName = focused ? "ios-grid" : "ios-grid-outline";
          } else if (route.name === "CreatePostScreen") {
            iconName = "ios-add-sharp";
          } else if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarItemStyle: {
          height: 40,
          borderRadius: 20,
        },
        tabBarContentContainerStyle: {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: 70,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="PostsList"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () => (
            <LogoutButtom onPress={handleSignOut}>
              <LogoutSvg width={24} height={24} style={{ marginRight: 16 }} />
            </LogoutButtom>
          ),
        })}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Tabs.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs.Navigator>
  );
}

const LogoutButtom = styled.TouchableOpacity``;
