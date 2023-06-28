import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddSvg from "../../assets/svg/add.svg";
import styled from "styled-components/native";
import RegistarationForm from "./RegistrationForm";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <RegistrationWrapper>
        <ImageBG source={require("../../assets/images/photoBG.png")}>
          <ContentWrapper>
            {/* <AvatarWrapper>
              <Avatar></Avatar>
              <AddSvg
                width={25}
                height={25}
                style={{
                  position: "absolute",
                  transform: [{ translateX: 60 }, { translateY: 33 }],
                }}
              />
            </AvatarWrapper>
            <PageTitle>Реєстрація</PageTitle> */}
            <RegistarationForm />
            <LoginLink>
              Вже є акаунт?
              <LoginRediraction onPress={() => navigation.navigate("Login")}>
                <LoginRediractionText>Увійти</LoginRediractionText>
              </LoginRediraction>
            </LoginLink>
          </ContentWrapper>
        </ImageBG>
      </RegistrationWrapper>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

const RegistrationWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ImageBG = styled.ImageBackground`
  width: 100%;
  height: 100%;
  /* justify-content: flex-end; */
  justify-content: flex-end;
  resize: cover;
`;

const ContentWrapper = styled.View`
  margin-top: 235px;
  padding: 120px 16px 66px;
  background-color: #ffffff;
  border-radius: 25px 25px 0px 0px;
`;

const AvatarWrapper = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -120px;
`;

const Avatar = styled.View`
  width: 120px;
  height: 120px;
  background: #f6f6f6;
  border-radius: 16px;
`;

const PageTitle = styled.Text`
  margin-top: 92px;
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

const LoginRediraction = styled.TouchableOpacity`
  text-decoration: underline;
  margin-top: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #1b4371;
`;

const LoginRediractionText = styled.Text`
  text-decoration: underline;
  top: 4px;
  left: 5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #1b4371;
`;
