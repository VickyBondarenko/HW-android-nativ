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
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import UserInfo from "./UserInfo";
import UserInfoImage from "../../assets/images/userFoto.png";

const PostsScreen = () => {
  console.log("UserInfo", UserInfo);
  return (
    <>
      <ScreenWrapper>
        <UserInfo
          fotoURL={{ uri: { UserInfoImage } }}
          name="Natali Romanova"
          email="email@example.com"
        />
      </ScreenWrapper>
    </>
  );
};
export default PostsScreen;

const ScreenWrapper = styled.View`
  flex: 1;
  width: 100%;
  /* justify-content: center;
  align-items: center; */
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;
