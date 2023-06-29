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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config";

const PostsScreen = () => {
  // const email = auth.currentUser?.email;
  // const name = auth.currentUser?.displayName;

  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        // Перевіряємо у консолі отримані дані
        snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
        // Повертаємо масив обʼєктів у довільній формі
        const test = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data,
        }));
        console.log("test", test);
        return test;
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    const testPosts = getDataFromFirestore();
    console.log("testPosts", testPosts);
  }, []);

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
