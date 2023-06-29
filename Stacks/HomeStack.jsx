import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import CommentsScreen from "../Screens/CommentsScreen/CommentsScreen";
import MapScreen from "../Screens/MapScreen/MapScreen";
import PostStack from "./PostStack";
import { auth } from "../config";
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../redux/authSlice/authSlice";
import { collection, getDocs } from "firebase/firestore";

const Stack = createStackNavigator();

export default function HomeStack() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { displayName, email, photoURL, uid } = auth.currentUser;
    const userData = {
      displayName,
      email,
      photoURL,
      uid,
    };
    console.log("userDataTest", userData);
    dispatch(addCurrentUser(userData));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="PostsList"
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
          if (route.name === "CommentsScreen" || route.name === "MapScreen") {
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
      })}
    >
      <Stack.Screen
        name="PostStackScreen"
        component={PostStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ title: "Коментарі" }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </Stack.Navigator>
  );
}
