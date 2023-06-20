import React, { useState } from "react";
import { Text, TextInput, View, Button, ImageBackground } from "react-native";

import styled from "styled-components/native";
import RegistarationForm from "./RegistrationForm";

const RegistrationScreen = () => {
  return (
    <RegistrationWrapper>
      <ImageBG source={require("../../assets/images/photoBG.png")}>
        <ContentWrapper>
          <AvatarWrapper>
            <Avatar></Avatar>
          </AvatarWrapper>
          <PageTitle>Реєстрація</PageTitle>
          <RegistarationForm />
          <LoginLink>Вже є акаунт? Увійти</LoginLink>
        </ContentWrapper>
      </ImageBG>
    </RegistrationWrapper>
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
  justify-content: flex-end;
  resize: cover;
`;

const ContentWrapper = styled.View`
  /* margin-top: 235px; */
  padding: 120px 16px 66px;
  background-color: #ffffff;
  border-radius: 25px 25px 0px 0px;
`;

const PageTitle = styled.Text`
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

const AvatarWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: -120px;
  margin-bottom: 32px;
`;

const Avatar = styled.View`
  width: 120px;
  height: 120px;
  background: #f6f6f6;
  border-radius: 16px;
`;
// const Input = styled.TextInput`
//   height: 50px;
//   width: 100%;
//   padding: 16px;
//   border-radius: 8px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: #e8e8e8;
//   background: #f6f6f6;
//   margin-bottom: 16px;
// `;

// const SubmittButton = styled.TouchableOpacity`
//   margin-top: 43px;
//   background: #ff6c00;
//   border-radius: 100px;
//   padding: 16px 0;
//   cursor: pointer;
// `;
// const ButtonText = styled.Text`
//   font-family: "Roboto";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 19px;
//   text-align: center;
//   color: #ffffff;
// `;
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
