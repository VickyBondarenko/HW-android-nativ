import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import * as Location from "expo-location";
import BasketSvg from "../../assets/svg/basket.svg";
// import CameraSvg from "../../assets/svg/camera.svg";
import MapSvg from "../../assets/svg/map-pin.svg";
import PhotoCamera from "../../Components/Camera";
import { addPost, addPosition } from "../../redux/postSlice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CreatePostScreen({ route, navigation }) {
  const [disableSbm, setDisableSbm] = useState(true);
  const [imageURI, setImageURI] = useState(null);
  //  const [displayCam, setDisplayCam] = useState(false);
  const [position, setPosition] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  provider = PROVIDER_GOOGLE;
  const dispatch = useDispatch();

  useEffect(() => {
    setImageURI(null);
    setTitle("");
    setLocation("");
    setDisableSbm(true);
  }, []);

  useEffect(() => {
    if (title && imageURI) {
      setDisableSbm(false);
    } else {
      setDisableSbm(true);
    }
  }, [title, imageURI]);

  useEffect(() => {
    if (imageURI !== null) {
      let locationSubscription;
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
          async (newLocation) => {
            const coords = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            };
            setPosition(coords);

            const geocode = await Location.reverseGeocodeAsync(coords);
            if (geocode.length > 0) {
              const { city, country } = geocode[0];
              setLocation(`${city}, ${country}`);
            }
          }
        );
      })();
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    } else if (imageURI === null) {
      setLocation("");
    }
  }, [imageURI]);

  const resetForm = () => {
    setImageURI(null);
    setTitle("");
    setLocation("");
    setDisableSbm(true);
  };

  const handleSubmit = async () => {
    await AsyncStorage.clear();
    console.log("Storage cleared");
        dispatch(addPost({ imageURI, location, title }));
    dispatch(addPosition(position));
    resetForm();
    navigation.navigate("PostsList");
  };

  return (
    <CreatePostScreenWrapper>
      <FormWrapper>
        <PhotoCamera setImageURI={setImageURI} imageURI={imageURI} />
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
        <SubmitButton onPress={() => handleSubmit()} disabled={disableSbm}>
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

const AddPostInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px 0px 0px;
  color: black;
  font-size: 16px;
  font-family: Roboto;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
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
  background-color: ${(props) => (props.disabled ? "#F6F6F6" : "#ff6c00")};
  padding: 16px 32px;
  margin-top: 32px;
`;

const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  padding: 8px 23px;
  border-radius: 20px;
  background: #f6f6f6;
`;
