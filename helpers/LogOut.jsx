import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config";

export default function handleSignOut() {
  auth
    .signOut()
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.nessage));
}
