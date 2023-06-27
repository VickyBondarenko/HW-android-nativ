import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectPostState } from "../redux/postSlice/PostSelector";
import styled from "styled-components/native";
import ThumbsUp from "../assets/svg/thumbs-up.svg";
import MessageCircle from "../assets/svg/message-circle.svg";

const PostCard = ({
  imageSource,
  title,
  location,
  comments,
  likes,
  position,
}) => {
  const navigation = useNavigation();

  return (
    <PostCardWrapper>
      <PhotoWrapper>
        <Picture source={{ uri: imageSource }} />
      </PhotoWrapper>
      <PhotoInfoWrapper>
        <PhotoTitle>{title}</PhotoTitle>
        <AnotationWrapper>
          <ReactionWrapper>
            <CommentsWrapper
              onPress={() => navigation.navigate("CommentsScreen")}
            >
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

          <LocationWrapper
            onPress={() =>
              navigation.navigate("MapScreen", {
                location,
                position,
              })
            }
          >
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

const Picture = styled.Image`
  width: 100%;
  border-radius: 8px;
  height: 240px;
  background-color: green;
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

const CommentsWrapper = styled.TouchableOpacity`
  flex-direction: row;
`;

const LocationWrapper = styled.TouchableOpacity`
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
