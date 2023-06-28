import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { selectPostState } from "../../redux/postSlice/PostSelector";
import UserHeader from "./UserHeader";
import LogoutSvg from "../../assets/svg/log-out.svg";
import PostCard from "../../Components/PostCard";
import { auth } from "../../config";

const windowHeight = Dimensions.get("window").height;

function ProfileScreen() {
  const postState = useSelector(selectPostState);
  console.log("postState", postState);
  const { comments, likes, postContent } = postState;
  const { imageURI, location, position, title } = postContent;
  const { count } = comments;

  const name = auth.currentUser?.displayName;

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
    <ProfileScreenWrapper contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBG
        source={require("../../assets/images/photoBG.png")}
        style={{ height: windowHeight }}
      >
        <ContentWrapper>
          <LogoutButtom onPress={handleSignOut}>
            <LogoutSvg width={24} height={24} />
          </LogoutButtom>
          <UserHeader name={name} />
          {/* <PostCard
            imageSource={require("../../assets/images/forestFoto.png")}
            title="Ліс"
            comments="8"
            likes="153"
            location="Ukraine"
          />
          <PostCard
            imageSource={require("../../assets/images/seaFoto.png")}
            title="Захід на Чорному морі"
            comments="3"
            likes="200"
            location="Ukraine"
          /> */}
          <PostCard
            imageSource={imageURI}
            title={title}
            comments={count}
            location={location}
            position={position}
            likes={`${likes}`}
          />
        </ContentWrapper>
      </ImageBG>
    </ProfileScreenWrapper>
  );
}

export default ProfileScreen;

const ProfileScreenWrapper = styled.ScrollView`
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
const UserHeaderWrapper = styled.View`
  /* align-items: flex-end; */
`;

const LogoutButtom = styled.TouchableOpacity`
  align-items: flex-end;
  padding-top: 22px;
  z-index: 1;
`;
