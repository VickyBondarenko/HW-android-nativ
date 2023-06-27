import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraSvg from "../assets/svg/camera.svg";
import styled from "styled-components/native";

export default function Photocamera() {
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
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const savePicture = async () => {
  //     if (image) {
  //         try {
  //             await MediaLibrary.createAssetAsync(image);
  //             alert("Picture save sucsesfull!");
  //             setImage(null)
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }
  // };

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
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View>
              <SvgWrapper onPress={takePicture}>
                <CameraSvg width={24} height={24} />
              </SvgWrapper>
            </View>
          </Camera>
          <PhotoChangeButton>
            <PhotoChangeText>Завантажте фото</PhotoChangeText>
          </PhotoChangeButton>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <PhotoChangeButton>
            <PhotoChangeText onPress={() => setImage(null)}>
              Редагувати фото
            </PhotoChangeText>
          </PhotoChangeButton>
        </>
      )}
    </CameraContainer>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     width: "100%",
  //   },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    height: 240,
    // aspectRatio: 16 / 9,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

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
const AddPicture = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background: #f6f6f6;
`;
const CameraContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 270px;
`;
