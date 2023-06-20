import React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import styled from "styled-components/native";
import LogInForm from "./LoginForm";

const LogInScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LogInWrapper>
        <ImageBG source={require("../../assets/images/photoBG.png")}>
          <ContentWrapper>
            <PageTitle>Увійти</PageTitle>
            <LogInForm />
            <LoginLink>Немає акаунту? Зареєструватися</LoginLink>
          </ContentWrapper>
        </ImageBG>
      </LogInWrapper>
    </TouchableWithoutFeedback>
  );
};
export default LogInScreen;

const LogInWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ImageBG = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  resize: cover;
`;

const ContentWrapper = styled.View`
  margin-top: 295px;
  padding: 32px 16px 144px;
  background-color: #ffffff;
  border-radius: 25px 25px 0px 0px;
`;

const PageTitle = styled.Text`
  /* margin-top: 92px; */
  padding-bottom: 32px;
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
