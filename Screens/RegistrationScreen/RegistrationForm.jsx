import React, { useState } from "react";
import { Text, TextInput, View, Button, ImageBackground } from "react-native";
import { Formik } from "formik";
// import * as yup from "yup";
import styled from "styled-components/native";

const RegistarationForm = () => {
  const myHandleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  const initialValues = { avatar: "", login: "", email: "", password: "" };
  //   const validationSchema = yup.object().shape({
  //     avatar: yup.string().required("Please select an avatar"),
  //     username: yup.string().required("Please enter your username"),
  //     email: yup
  //       .string()
  //       .email("Please enter a valid email")
  //       .required("Please enter your email"),
  //     password: yup
  //       .string()
  //       .min(6, "Password must be at least 6 characters")
  //       .required("Please enter your password"),
  //   });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={myHandleSubmit}
      //   validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <FormWrapper>
          {/* <Button title="Select Avatar" onPress={() => {}} />
                {errors.avatar && <Text>{errors.avatar}</Text>} */}
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

          <SubmittButton onPress={handleSubmit}>
            <ButtonText>Зареєстуватися</ButtonText>
          </SubmittButton>
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
