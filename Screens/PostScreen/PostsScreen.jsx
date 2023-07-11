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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addPost,
  addPosition,
  addAllPosts,
} from "../../redux/postSlice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostState,
  selectAllPosts,
} from "../../redux/postSlice/PostSelector";
import { selectAuthState } from "../../redux/authSlice/authSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../../config";

import styled from "styled-components/native";
import UserInfo from "./UserInfo";
import PostCard from "../../Components/PostCard";
import ForestFoto from "../../assets/images/forestFoto.png";
import UserImage from "../../assets/images/userFoto.png";
import { collection, getDocs } from "firebase/firestore";

const PostsScreen = () => {
  const dispatch = useDispatch();

  const postState = useSelector(selectPostState);
  const authState = useSelector(selectAuthState);
  const route = useRoute();
  const { refresh = false } = route.params || {};

  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        dispatch(addAllPosts(result));
        return result;
      } catch (error) {
        console.log("this error", error);
      }
    };
    getDataFromFirestore();
  }, [route, refresh]);

  const posts = useSelector(selectAllPosts);
  const sortedPosts = [...posts].sort(
    (a, b) => b.data.createAt - a.data.createAt
  );

  const { photoURL, email, displayName } = authState;
  const { comments, likes, postContent } = postState;
  const { imageURI, location, position, title } = postContent;
  const { count } = comments;

  return (
    <ScreenWrapper>
      {sortedPosts.lenght !== 0 &&
        sortedPosts.map((post) => (
          <PostWrapper key={post.id}>
            <UserInfo
              userPhoto={{ uri: post.data.author.photoURL }}
              name={post.data.author.displayName}
              email={post.data.author.email}
            />
            <PostCard
              imageSource={post.data.postContent.imageURI}
              title={post.data.postContent.title}
              comments={post.data.comments.count}
              location={post.data.postContent.location}
              position={post.data.postContent.position}
              likes={null}
              id={post.id}
            />
          </PostWrapper>
        ))}
      {/* <Text>hello</Text> */}
    </ScreenWrapper>
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

const PostWrapper = styled.View`
  width: 100%;
`;
