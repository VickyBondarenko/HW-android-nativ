import React from "react";
import { Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectPostState } from "../redux/postSlice/PostSelector";
import { auth } from "../config";
import styled from "styled-components/native";

const Comment = ({ avatarSource, text, day, time, autorId }) => {
  const { uid } = auth.currentUser;
  const ownComment = autorId === uid;

  console.log("ownComment", ownComment);
  return (
    <CommentCard ownComment={ownComment}>
      <Avatar source={{ uri: avatarSource }}></Avatar>
      <Message ownComment={ownComment}>
        <MessageText>{text}</MessageText>
        <MessageDate ownComment={ownComment}>
          <DateDay> {day}</DateDay>
          <DateTime> {time}</DateTime>
        </MessageDate>
      </Message>
    </CommentCard>
  );
};

export default Comment;

const CommentCard = styled.View`
  width: 100%;
  flex-direction: ${(props) => (props.ownComment ? "row-reverse" : "row")};
  /* flex-direction: row; */
  gap: 16px;
  margin-bottom: 24px;
`;
const Avatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 28px;
`;

const Message = styled.View`
  justify-content: center;
  /* align-items: center; */
  align-items: flex-start;
  text-align: right;
  width: 310px;
  padding: 16px;
  border-radius: ${(props) =>
    props.ownComment ? "6px 0px 6px 6px" : "0px 6px 6px 6px"};
  background: rgba(0, 0, 0, 0.03);
  gap: 8px;
`;

const MessageText = styled.Text`
  color: #212121;
  font-size: 13px;
  font-family: Roboto;
  line-height: 18px;
`;

const MessageDate = styled.View`
  width: 100%;
  flex-direction: row;
  /* align-self: end; */
  justify-content: ${(props) =>
    !props.ownComment ? "flex-start" : "flex-end"};
  /* justify-content: flex-start; */

  gap: 4px;
`;

const DateDay = styled.Text`
  color: #bdbdbd;
  padding-right: 4px;
  /* text-align: ${(props) => (props.ownComment ? "right" : "left")}; */
  /* text-align: left; */
  font-size: 10px;
  font-family: Roboto;
  border-right-width: 1px;
  border-right-color: #bdbdbd;
`;
const DateTime = styled.Text`
  color: #bdbdbd;
  /* text-align: ${(props) => (props.ownComment ? "right" : "left")}; */
  /* text-align: right; */
  font-size: 10px;
  font-family: Roboto;
`;
