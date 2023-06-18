import React, { useState } from "react";
import { Text, TextInput, View, Button, A } from "react-native";

const LoginScreen = () => {
  const [text, setText] = useState("");
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: 212121 }}>Увійти</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Адреса електронної пошти"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Пароль"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button title="Увійти" onPress={() => console.log("hello")} />
      <Text>Немає акаунту? Зареєструватися</Text>
    </View>
  );
};

export default LoginScreen;
