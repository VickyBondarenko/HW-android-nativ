import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import ForestFoto from "../../assets/images/forestFoto.png";
import MessageCircle from "../../assets/svg/message-circle.svg";

const PostCard = ({ photoSours, title, location }) => {
  return (
    <PostCardWrapper>
      <PhotoWrapper>
        <Image source={ForestFoto} style={{ width: "100%", borderRadius: 8 }} />
      </PhotoWrapper>
      <PhotoInfoWrapper>
        <PhotoTitle>Ліс</PhotoTitle>
        <AnotationWrapper>
          <CommentsWrapper>
            <MessageCircle width={24} height={24} />
            <CommentsCount>0</CommentsCount>
          </CommentsWrapper>
          <LocationWrapper>
            <Ionicons name="location-outline" size={24} color={"#BDBDBD"} />
            <LocationDiscription>
              Ivano-Frankivs'k Region, Ukraine
            </LocationDiscription>
          </LocationWrapper>
        </AnotationWrapper>
      </PhotoInfoWrapper>
    </PostCardWrapper>
  );
};

export default PostCard;

const PostCardWrapper = styled.View`
  width: 100%;
  flex: 1;
`;

const PhotoWrapper = styled.View`
  width: 100%;
`;
const PhotoInfoWrapper = styled.View`
  /* flex: 1; */
`;
const AnotationWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const CommentsWrapper = styled.View`
  flex-direction: row;
`;

const LocationWrapper = styled.View`
  flex-direction: row;
`;

const PhotoTitle = styled.Text`
  color: #212121;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  padding: 8px 0;
`;

const CommentsCount = styled.Text`
  color: #bdbdbd;
  font-size: 16px;
  font-family: Roboto;
`;
const LocationDiscription = styled.Text`
  color: #212121;
  text-align: right;
  font-size: 16px;
  font-family: Roboto;
  text-decoration-line: underline;
`;
