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
import PostCard from "./PostCard";

const PostsScreen = () => {
  return (
    <>
      <ScreenWrapper>
        <UserInfo
          fotoURL={{}}
          name="Natali Romanova"
          email="email@example.com"
        />
        <PostCard />
      </ScreenWrapper>
    </>
  );
};
export default PostsScreen;

const ScreenWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;
