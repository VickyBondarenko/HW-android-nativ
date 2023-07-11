import React from "react";
import { Text, View, Image } from "react-native";
import UserImage from "../assets/images/userFoto.png";
import styled from "styled-components/native";

const UserHeader = ({ fotoURL, name }) => {
  return (
    <UserHeaderWrapper>
      <Image
        source={fotoURL}
        style={{
          width: 120,
          height: 120,
          borderRadius: 16,
        }}
      />

      <UserName>{name}</UserName>
    </UserHeaderWrapper>
  );
};

export default UserHeader;

const UserHeaderWrapper = styled.View`
  margin-top: -139px;
  align-items: center;
`;

const UserName = styled.Text`
  color: #212121;
  text-align: center;
  font-size: 30px;
  font-family: Roboto;
  font-weight: 500;
  letter-spacing: 0.3px;
`;
