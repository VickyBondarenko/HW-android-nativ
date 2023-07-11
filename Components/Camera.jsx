import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraSvg from "../assets/svg/camera.svg";
import styled from "styled-components/native";

export default function Photocamera({ setImageURI, imageURI }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === `granted`);
    })();
    setImage(null);
  }, []);

  useEffect(() => {
    setImageURI(image);
    if (image) {
      savePicture();
    }
  }, [image]);

  useEffect(() => {
    if (!imageURI) {
      setImage(null);
    }
  }, [imageURI]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.log("1", error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const pict = await MediaLibrary.createAssetAsync(image);
        console.log("Picture save!");
      } catch (error) {
        console.log("2", error);
      }
    }
  };

  if (hasPermission === false) {
    return (
      <Text style={{ textAlign: "center" }}>
        We need your permission to show the camera
      </Text>
    );
  }

  return (
    <CameraContainer style={styles.container}>
      {!image ? (
        <>
          <AddCamera type={type} ref={cameraRef}>
            <View>
              <SvgWrapper onPress={takePicture}>
                <CameraSvg width={24} height={24} />
              </SvgWrapper>
            </View>
          </AddCamera>
          <PhotoChangeButton>
            <PhotoChangeText>Завантажте фото</PhotoChangeText>
          </PhotoChangeButton>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <PhotoChangeButton>
            <PhotoChangeText
              onPress={() => {
                setImage(null);
              }}
            >
              Редагувати фото
            </PhotoChangeText>
          </PhotoChangeButton>
        </>
      )}
    </CameraContainer>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    height: 240,
  },
});

const AddCamera = styled(Camera)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  height: 240px;
`;

const SvgWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: #fff;
`;

const PhotoChangeButton = styled.TouchableOpacity`
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

const CameraContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 270px;
`;
