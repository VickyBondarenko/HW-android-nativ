import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import styled from "styled-components/native";

import { auth } from "../../config";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const RegistarationForm = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);

  const [displayText, setDisplaytext] = useState("Показати");

  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };

  const myHandleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    navigation.navigate("Home");
  };

  const handleSignUp = (values, { resetForm }) => {
    const { login, email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        const user = userData.user;
        updateProfile(user, { displayName: login })
          .then(() => {
            console.log("You signed up");
            console.log("Hello,", user.displayName);
          })
          .catch((error) => {
            console.error("Sorry, error ocured. Message:", error);
          });
      })
      .catch((e) => alert(e.message));

    console.log(values);
    navigation.navigate("Home");
    resetForm();
  };

  const initialValues = { avatar: "", login: "", email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignUp}>
      {({ handleChange, handleSubmit, values, errors }) => (
        <FormWrapper>
          {/* <Button title="Select Avatar" onPress={() => {}} />
                {errors.avatar && <Text>{errors.avatar}</Text>} */}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Input
              placeholder="Логін"
              onChangeText={handleChange("login")}
              value={values.login}
            />
            <Input
              placeholder="Адреса електронної пошти"
              onChangeText={handleChange("email")}
              value={values.email}
            />
            <PasswordWrapper>
              <Input
                placeholder="Пароль"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={showPassword}
              />

              <ShowPasswordButton onPress={handleTogglePassword}>
                <ShowPasswordText>{displayText}</ShowPasswordText>
              </ShowPasswordButton>
            </PasswordWrapper>
            <SubmittButton onPress={handleSubmit}>
              <ButtonText>Зареєстуватися</ButtonText>
            </SubmittButton>
          </KeyboardAvoidingView>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default RegistarationForm;

const FormWrapper = styled.View``;

const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #e8e8e8;
  background: #f6f6f6;
  margin-bottom: 16px;
`;

const SubmittButton = styled.TouchableOpacity`
  margin-top: 43px;
  background: #ff6c00;
  border-radius: 100px;
  padding: 16px 0;
  cursor: pointer;
`;
const ButtonText = styled.Text`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
`;

const PasswordWrapper = styled.View`
  position: relative;
`;
const ShowPasswordText = styled.Text`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: right;

  color: #1b4371;
`;
const ShowPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
`;
