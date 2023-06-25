import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import UserImage from "../../assets/images/userFoto.png";
import SendComment from "../../assets/svg/send-comment.svg";
// import ImageSource from "../../assets/images/seeFoto.png";

function CommentsScreen() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    console.log({ comment });
    setComment("");
  };

  return (
    <CommentsScreenWrapper>
      <ContetWrapper>
        <PostPhoto
          source={require("../../assets/images/seaFoto.png")}
          style={{
            width: "100%",
            borderRadius: 8,
          }}
        ></PostPhoto>
        <CommentsWrapper>
          <CommentCard>
            <Avatar source={UserImage}></Avatar>
            <Message>
              <MessageText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis distinctio enim veniam recusandae numquam delectus
                modi eum vel in voluptatem rem amet illo omnis officia
                cupiditate dolorum, iusto voluptate adipisci.
              </MessageText>
              <MessageDate>
                <DateDay>19 06 2023</DateDay>
                <DateTime>16:15</DateTime>
              </MessageDate>
            </Message>
          </CommentCard>
        </CommentsWrapper>
      </ContetWrapper>
      <InputWrapper>
        <AddCommentInput
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={setComment}
        />

        <SubmitCommentButton onPress={() => handleSubmit()}>
          <SendComment width={34} height={34} />
        </SubmitCommentButton>
      </InputWrapper>
    </CommentsScreenWrapper>
  );
}

export default CommentsScreen;

const CommentsScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 16px;
  background: #ffffff;
`;

const ContetWrapper = styled.View`
  width: 100%;
  align-items: center;
  gap: 32px;
`;

const PostPhoto = styled.Image``;
const CommentsWrapper = styled.View`
  width: 100%;
  align-items: center;
  gap: 24px;
`;

const CommentCard = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
`;
const Avatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 28px;
`;

const Message = styled.View`
  justify-content: center;
  align-items: flex-start;
  width: 310px;
  padding: 16px;
  border-radius: 6px 0px 6px 6px;
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
  flex-direction: row;
  gap: 4px;
`;

const DateDay = styled.Text`
  color: #bdbdbd;
  padding-right: 4px;
  text-align: right;
  font-size: 10px;
  font-family: Roboto;
  border-right-width: 1px;
  border-right-color: #bdbdbd;
`;
const DateTime = styled.Text`
  color: #bdbdbd;
  text-align: right;
  font-size: 10px;
  font-family: Roboto;
`;

const InputWrapper = styled.View`
  width: 100%;
  position: relative;
`;

const AddCommentInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px;
  border-radius: 20px;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.03);
  /* ::placeholder {
    font-size: 16px;
    font-family: Roboto;
    font-weight: 500;
  } */
`;

const SubmitCommentButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
`;
