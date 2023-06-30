import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import {
  selectPostState,
  selectAllPosts,
} from "../../redux/postSlice/PostSelector";
import UserHeader from "./UserHeader";
import LogoutSvg from "../../assets/svg/log-out.svg";
import PostCard from "../../Components/PostCard";
import { selectAuthState } from "../../redux/authSlice/authSelector";
import { addAllPosts } from "../../redux/postSlice/postSlice";
import { auth, db } from "../../config";
import { collection, getDocs } from "firebase/firestore";

const windowHeight = Dimensions.get("window").height;

function ProfileScreen() {
  const dispatch = useDispatch();

  const allPosts = useSelector(selectAllPosts);
  const authState = useSelector(selectAuthState);

  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        console.log("snapshot.docs", snapshot.docs);
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        console.log("result", result);
        dispatch(addAllPosts(result));
        return result;
      } catch (error) {
        console.log("this error", error);
      }
    };
    getDataFromFirestore();
  }, []);

  const { photoURL, email, displayName, uid } = authState;
  console.log("allPosts", allPosts);
  const userPosts = [...allPosts].filter(
    (post) => post.data.author.uid === uid
  );
  console.log("userPosts", userPosts);

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
        source={require("../../assets/images/photoBG.png")}
        style={{ height: windowHeight }}
      >
        <ContentWrapper>
          <LogoutButtom onPress={handleSignOut}>
            <LogoutSvg width={24} height={24} />
          </LogoutButtom>
          <UserHeader name={displayName} fotoURL={{ uri: photoURL }} />
          <PostsWrapper>
            {userPosts.length > 0 &&
              userPosts.map((post) => (
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
  /* height: 100%; */
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
const UserHeaderWrapper = styled.View`
  /* align-items: flex-end; */
`;

const LogoutButtom = styled.TouchableOpacity`
  align-items: flex-end;
  padding-top: 22px;
  z-index: 1;
`;
