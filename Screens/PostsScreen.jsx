import React, { useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { addAllPosts } from "../redux/postSlice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostState,
  selectAllPosts,
} from "../redux/postSlice/PostSelector";
import { selectAuthState } from "../redux/authSlice/authSelector";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

import UserInfo from "../Components/UserInfo";
import PostCard from "../Components/PostCard";
import styled from "styled-components/native";

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
