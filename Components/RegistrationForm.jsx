import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { addCurrentUser } from "../redux/authSlice/authSlice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import AddSvg from "../assets/svg/add.svg";
import styled from "styled-components/native";

const RegistarationForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [userImage, setUserImage] = useState(null);
  const [displayText, setDisplaytext] = useState("Показати");

  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = (event) => {
    setShowPassword(!showPassword);
  };

  const handleChooseAvatar = async () => {
    const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (galleryStatus.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        console.log("image1", userImage);
        setUserImage(result.assets[0].uri);
      }
    } else {
      return console.log(`no access`);
    }
  };

  const handleSignUp = async (values, { resetForm }) => {
    const { login, email, password } = values;
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;

      if (userImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        const response = await fetch(userImage);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const avatarURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: login,
          photoURL: avatarURL,
        });
      } else {
        await updateProfile(user, {
          displayName: login,
        });
      }

      const userProfile = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      dispatch(addCurrentUser(userProfile));

      setUserImage(null);

      navigation.navigate("Home");
      resetForm();
    } catch (error) {
      console.error("Sorry, error occurred. Message:", error);
      console.error("Error details:", error.serverResponse);
      alert(error.message);
    }
  };

  const initialValues = { avatar: "", login: "", email: "", password: "" };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignUp}>
      {({ handleChange, handleSubmit, values, errors }) => (
        <FormWrapper>
          <AvatarWrapper>
            <Avatar source={{ uri: userImage }} />
            <AvatarButton onPress={handleChooseAvatar}>
              <AddSvg width={25} height={25} />
            </AvatarButton>
          </AvatarWrapper>
          <PageTitle>Реєстрація</PageTitle>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Input
              placeholder="Логін"
              onChangeText={handleChange("login")}
              value={values.login}
            />
            <Input
              placeholder="Адреса електронної пошти"
              onChangeText={handleChange("email")}
              value={values.email}
            />
            <PasswordWrapper>
              <Input
                placeholder="Пароль"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={showPassword}
              />

              <ShowPasswordButton onPress={handleTogglePassword}>
                <ShowPasswordText>{displayText}</ShowPasswordText>
              </ShowPasswordButton>
            </PasswordWrapper>
            <SubmittButton onPress={handleSubmit}>
              <ButtonText>Зареєстуватися</ButtonText>
            </SubmittButton>
          </KeyboardAvoidingView>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default RegistarationForm;

const FormWrapper = styled.View``;

const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #e8e8e8;
  background: #f6f6f6;
  margin-bottom: 16px;
`;

const SubmittButton = styled.TouchableOpacity`
  margin-top: 43px;
  background: #ff6c00;
  border-radius: 100px;
  padding: 16px 0;
  cursor: pointer;
`;
const ButtonText = styled.Text`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
`;

const PasswordWrapper = styled.View`
  position: relative;
`;
const ShowPasswordText = styled.Text`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #1b4371;
`;
const ShowPasswordButton = styled.TouchableOpacity`
  /* position: absolute;
  right: 16px;
  top: 16px; */
`;

const AvatarWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -170px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  background: #f6f6f6;
  border-radius: 16px;
`;
const AvatarButton = styled.TouchableOpacity`
  position: absolute;
  transform: translateX(60px) translateY(33px);
`;

const PageTitle = styled.Text`
  margin-top: 32px;
  padding-bottom: 32px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  color: #212121;
`;
