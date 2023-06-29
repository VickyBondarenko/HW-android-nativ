import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  selectPostState,
  selectAllPosts,
} from "../../redux/postSlice/PostSelector";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../redux/authSlice/authSelector";
import styled from "styled-components/native";
import UserImage from "../../assets/images/userFoto.png";
import SendComment from "../../assets/svg/send-comment.svg";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config";
import { collection, getDocs } from "firebase/firestore";
import {
  addPost,
  addPosition,
  addAllPosts,
} from "../../redux/postSlice/postSlice";
import getCurrentDateTime from "../../helpers/getCurrentDate";

function CommentsScreen() {
  dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const authState = useSelector(selectAuthState);
  const { photoURL, uid } = authState;

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

  const {
    params: { id },
  } = useRoute();
  const [{ data }] = posts.filter((post) => post.id === id);
  const comentsList = data.comments.list;
  console.log("comentsList", comentsList);

  const [commentText, setCommentText] = useState("");
  // const [allComents, setAllComents] = useState([]);
  // console.log("allComents", allComents);

  const updateDataInFirestore = async (count, allComments) => {
    try {
      const ref = doc(db, "posts", `${id}`);

      await updateDoc(ref, {
        comments: {
          count: count,
          list: allComments,
        },
      });
      console.log("document updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    console.log("hello");
    const { formattedDate, formattedTime } = getCurrentDateTime();
    const newComment = {
      author: {
        photoURL: photoURL,
        uid: uid,
      },
      text: commentText,
      date: {
        day: formattedDate,
        time: formattedTime,
      },
    };

    // setAllComents(allComents.push(newComment));
    const allComments = [...comentsList, newComment];
    const count = allComments.length;

    console.log("allComments", allComments);
    console.log("count", count);
    console.log("newComment", newComment);

    updateDataInFirestore(count, allComments);
    setCommentText("");

    console.log("posts in Comments", posts);
  };

  return (
    <CommentsScreenWrapper>
      <ContetWrapper>
        <PostPhoto
          source={{ uri: data.postContent.imageURI }}
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
          value={commentText}
          onChangeText={setCommentText}
        />

        <SubmitCommentButton onPress={handleSubmit}>
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

const PostPhoto = styled.Image`
  height: 240px;
`;
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
