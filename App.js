import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  console.log("LoginScreen", LoginScreen);
  return (
    <View style={styles.container}>
      {/* <Text>Hello</Text> */}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <LoginScreen />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
