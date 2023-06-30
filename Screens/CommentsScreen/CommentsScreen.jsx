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
import Comment from "../../Components/Comment";

function CommentsScreen() {
  dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const authState = useSelector(selectAuthState);
  const { photoURL, uid } = authState;
  const [commentText, setCommentText] = useState("");
  const [chengeComents, setChengeComents] = useState(false);

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
  }, [chengeComents]);

  const {
    params: { id },
  } = useRoute();
  const [{ data }] = posts.filter((post) => post.id === id);
  const comentsList = data.comments.list;
  console.log("comentsList", comentsList);

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

    const allComments = [...comentsList, newComment];
    const count = allComments.length;

    console.log("allComments", allComments);
    console.log("count", count);
    console.log("newComment", newComment);

    updateDataInFirestore(count, allComments);
    setCommentText("");
    setChengeComents(!chengeComents);
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
          {comentsList.length > 0 &&
            comentsList.map((coment) => (
              <Comment
                key={coment.date.time}
                avatarSource={coment.author.photoURL}
                text={coment.text}
                day={coment.date.day}
                time={coment.date.time}
                autorId={coment.author.uid}
              />

              // <CommentCard key={coment.date.time}>
              //   <Avatar source={{ uri: coment.author.photoURL }}></Avatar>
              //   <Message>
              //     <MessageText>{coment.text}</MessageText>
              //     <MessageDate>
              //       <DateDay> {coment.date.day}</DateDay>
              //       <DateTime> {coment.date.time}</DateTime>
              //     </MessageDate>
              //   </Message>
              // </CommentCard>
            ))}
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
const CommentsWrapper = styled.ScrollView`
  width: 100%;
  height: 322px;
  /* align-items: center; */
  gap: 24px;
  margin-bottom: 5px;
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
`;

const SubmitCommentButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
`;
