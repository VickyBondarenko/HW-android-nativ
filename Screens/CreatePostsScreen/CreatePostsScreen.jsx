import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import BasketSvg from "../../assets/svg/basket.svg";
import CameraSvg from "../../assets/svg/camera.svg";
import MapSvg from "../../assets/svg/map-pin.svg";
import PhotoCamera from "../../Components/Camera";

function CreatePostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const resetForm = (e) => {
    setTitle("");
    setLocation("");
  };

  const handleSubmit = (e) => {
    console.log({ title, location });
    resetForm();
    navigation.navigate("PostsList");
  };

  return (
    <CreatePostScreenWrapper>
      <FormWrapper>
        <PhotoCamera />
        {/* <AddPhoto> */}
        {/* <SvgWrapper>
            <CameraSvg width={24} height={24} />
          </SvgWrapper> */}
        {/* </AddPhoto> */}
        {/* <PhotoChange>
          <PhotoChangeText>Завантажте фото</PhotoChangeText>
        </PhotoChange> */}
        <AddPostInput
          placeholder="Назва..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#BDBDBD"
        />
        <LocationInputWrapper>
          <AddPostInput
            placeholder="Місцевість..."
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#BDBDBD"
            style={{
              paddingLeft: 28,
            }}
          />
          <MapSvg
            width={24}
            height={24}
            style={{
              position: "absolute",
              transform: [{ translateY: 20 }],
            }}
          />
        </LocationInputWrapper>
        <SubmitButton onPress={() => handleSubmit()}>
          <SubmitButtonText>Опубліковати</SubmitButtonText>
        </SubmitButton>
      </FormWrapper>
      <View>
        <DeleteButton onPress={() => resetForm()}>
          <BasketSvg width={24} height={24} />
        </DeleteButton>
      </View>
    </CreatePostScreenWrapper>
  );
}

export default CreatePostScreen;

const CreatePostScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 22px;
  background: #ffffff;
`;

const FormWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const AddPhoto = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background: #f6f6f6;
`;

const SvgWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: #fff;
`;

const PhotoChange = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  padding-top: 8px;
`;
const PhotoChangeText = styled.Text`
  text-align: left;
  color: #bdbdbd;
  font-size: 16px;
  font-family: Roboto;
  margin-bottom: 32px;
`;

const AddPostInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px 0px 0px;
  color: #bdbdbd;
  font-size: 16px;
  font-family: Roboto;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  /* ::placeholder {
    color: #bdbdbd;
    font-size: 16px;
    font-family: Roboto;
  } */
`;

const LocationInputWrapper = styled.View`
  width: 100%;
  position: relative;
  align-items: flex-start;
  margin-top: 16px;
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: Roboto;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  border-radius: 100px;
  background: #ff6c00;
  padding: 16px 32px;
  margin-top: 32px;
`;

const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  padding: 8px 23px;
  border-radius: 20px;
  background: #f6f6f6;
`;
