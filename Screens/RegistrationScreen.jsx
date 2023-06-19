import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import styled from "styled-components/native";

const StyledButton = styled.Button`
  background-color: orange;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const FormWrapper = styled.View``;

const Input = styled.TextInput`
  height: 50px;
  width: 343px;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #e8e8e8;
  background: #f6f6f6;
  margin-bottom: 16px;
`;

const RegistrationScreen = () => {
  const validationSchema = yup.object().shape({
    avatar: yup.string().required("Please select an avatar"),
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your password"),
  });

  const handleSubmit = (values) => {
    console.log({
      avatar: values.avatar,
      login: values.login,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <RegistarationWrapper>
      <View></View>
      <View>
        <PageTitle>Реєстрація</PageTitle>

        <Formik
          initialValues={{ avatar: "", login: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <FormWrapper>
              <Button title="Select Avatar" onPress={() => {}} />
              {errors.avatar && <Text>{errors.avatar}</Text>}
              <Input
                placeholder="Логін"
                onChangeText={handleChange("login")}
                value={values.login}
              />
              {errors.login && <Text>{errors.login}</Text>}
              <Input
                placeholder="Адреса електронної пошти"
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {errors.email && <Text>{errors.email}</Text>}
              <Input
                placeholder="Пароль"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && <Text>{errors.password}</Text>}
              <StyledButton title="Зареєстуватися" onPress={handleSubmit} />
            </FormWrapper>
          )}
        </Formik>
        <LoginLink>Вже є акаунт? Увійти</LoginLink>
      </View>
    </RegistarationWrapper>
  );
};
export default RegistrationScreen;

const RegistarationWrapper = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;
const PageTitle = styled.Text`
  padding: 32px 0;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  /* letter-spacing: 0.01; */

  color: #212121;
`;

const LoginLink = styled.Text`
  margin-top: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  text-align: center;

  color: #1b4371;
`;

// const SubmitButton = styled.Button`
//   color: red;
//   padding: 16px 0;
//   background: red;
//   border-radius: 100px;
// `;

// const LoginInput = styled.TextInput`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background: #f6f6f6;
//   border: 1px solid #e8e8e8;
//   border-radius: 8px;
// `;
