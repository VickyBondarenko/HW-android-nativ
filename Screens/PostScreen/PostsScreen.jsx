import React, { useState, useEffect } from "react";
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
import { addPost, addPosition } from "../../redux/postSlice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPostState } from "../../redux/postSlice/PostSelector";
import { selectAuthState } from "../../redux/authSlice/authSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config";

import styled from "styled-components/native";
import UserInfo from "./UserInfo";
import PostCard from "../../Components/PostCard";
import ForestFoto from "../../assets/images/forestFoto.png";
import UserImage from "../../assets/images/userFoto.png";

const PostsScreen = () => {
  // const email = auth.currentUser?.email;
  // const name = auth.currentUser?.displayName;

  const postState = useSelector(selectPostState);
  const authState = useSelector(selectAuthState);
  const { photoURL, email, displayName } = authState;
  // console.log("postState", postState);
  console.log("authState", authState);
  const { comments, likes, postContent } = postState;
  const { imageURI, location, position, title } = postContent;
  const { count } = comments;
  return (
    <>
      <ScreenWrapper>
        <UserInfo
          userPhoto={{ uri: photoURL }}
          name={displayName}
          email={email}
        />
        <PostCard
          imageSource={imageURI}
          title={title}
          comments={count}
          location={location}
          position={position}
        />
      </ScreenWrapper>
    </>
  );
};
export default PostsScreen;

const ScreenWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;
