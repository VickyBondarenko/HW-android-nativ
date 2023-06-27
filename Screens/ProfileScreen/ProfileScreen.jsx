import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import UserHeader from "./UserHeader";
import LogoutSvg from "../../assets/svg/log-out.svg";
import PostCard from "../../Components/PostCard";

const windowHeight = Dimensions.get("window").height;

function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <ProfileScreenWrapper contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBG
        source={require("../../assets/images/photoBG.png")}
        style={{ height: windowHeight }}
      >
        <ContentWrapper>
          <LogoutButtom onPress={() => navigation.navigate("Login")}>
            <LogoutSvg width={24} height={24} />
          </LogoutButtom>
          <UserHeader name="Natali Romanova" />
          <PostCard
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
          />
          <PostCard
            imageSource={require("../../assets/images/venece.png")}
            title="Старий будиночок у Венеції"
            comments="50"
            likes="200"
            location="Italy"
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
