import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import ThumbsUp from "../assets/svg/thumbs-up.svg";
import MessageCircle from "../assets/svg/message-circle.svg";

const PostCard = ({ imageSource, title, location, comments, likes }) => {
  return (
    <PostCardWrapper>
      <PhotoWrapper>
        <Image
          source={imageSource}
          style={{ width: "100%", borderRadius: 8 }}
        />
      </PhotoWrapper>
      <PhotoInfoWrapper>
        <PhotoTitle>{title}</PhotoTitle>
        <AnotationWrapper>
          <ReactionWrapper>
            <CommentsWrapper>
              <MessageCircle width={24} height={24} />
              <CommentsCount>{comments}</CommentsCount>
            </CommentsWrapper>
            {likes && (
              <LikesWrapper>
                <ThumbsUp width={24} height={24} />
                <LikesCount>{likes}</LikesCount>
              </LikesWrapper>
            )}
          </ReactionWrapper>

          <LocationWrapper>
            <Ionicons name="location-outline" size={24} color={"#BDBDBD"} />
            <LocationDiscription>{location}</LocationDiscription>
          </LocationWrapper>
        </AnotationWrapper>
      </PhotoInfoWrapper>
    </PostCardWrapper>
  );
};

export default PostCard;

const PostCardWrapper = styled.View`
  width: 100%;
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
const ReactionWrapper = styled.View`
  flex-direction: row;
  gap: 24px;
`;

const CommentsWrapper = styled.View`
  flex-direction: row;
`;

const LocationWrapper = styled.View`
  flex-direction: row;
`;

const LikesWrapper = styled.View`
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

const LikesCount = styled.Text`
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
