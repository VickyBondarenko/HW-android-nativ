import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { selectAllPosts } from "../redux/postSlice/PostSelector";
import { selectAuthState } from "../redux/authSlice/authSelector";
import { addAllPosts } from "../redux/postSlice/postSlice";
import { auth, db } from "../config";
import { collection, getDocs } from "firebase/firestore";

import PostCard from "../Components/PostCard";
import UserHeader from "../Components/UserHeader";
import LogoutSvg from "../assets/svg/log-out.svg";
import styled from "styled-components/native";

const windowHeight = Dimensions.get("window").height;

function ProfileScreen() {
  const dispatch = useDispatch();

  const allPosts = useSelector(selectAllPosts);
  const authState = useSelector(selectAuthState);

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
  }, []);

  const { photoURL, displayName, uid } = authState;
  const userPosts = [...allPosts].filter(
    (post) => post.data.author.uid === uid
  );
  const sortedUserPosts = [...userPosts].sort(
    (a, b) => b.data.createAt - a.data.createAt
  );

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ProfileScreenWrapper>
      <ImageBG
        source={require("../assets/images/photoBG.png")}
        style={{ height: windowHeight }}
      >
        <ContentWrapper>
          <LogoutButtom onPress={handleSignOut}>
            <LogoutSvg width={24} height={24} />
          </LogoutButtom>
          <UserHeader name={displayName} fotoURL={{ uri: photoURL }} />
          <PostsWrapper>
            {sortedUserPosts.length > 0 &&
              sortedUserPosts.map((post) => (
                <PostCard
                  key={post.id}
                  imageSource={post.data.postContent.imageURI}
                  title={post.data.postContent.title}
                  comments={post.data.comments.count}
                  location={post.data.postContent.location}
                  position={post.data.postContent.position}
                  likes={post.data.likes}
                  id={post.id}
                />
              ))}
          </PostsWrapper>
        </ContentWrapper>
      </ImageBG>
    </ProfileScreenWrapper>
  );
}

export default ProfileScreen;

const ProfileScreenWrapper = styled.View`
  flex: 1;
`;

const ImageBG = styled.ImageBackground`
  flex: 1;
  resize: cover;
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-top: 119px;
  padding: 0 16px;
  background-color: #ffffff;
  border-radius: 25px 25px 0px 0px;
  gap: 33px;
`;
const PostsWrapper = styled.ScrollView`
  flex: 1;
`;

const LogoutButtom = styled.TouchableOpacity`
  align-items: flex-end;
  padding-top: 22px;
  z-index: 1;
`;
