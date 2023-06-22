import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components/native";
import UserImage from "../../assets/images/userFoto.png";

const UserInfo = ({ fotoURL, name, email }) => {
  return (
    <UserInfoWrapper>
      <Image
        source={UserImage}
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          backgroundColor: "orange",
        }}
      />
      <UserInfoTextWrapper>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfoTextWrapper>
    </UserInfoWrapper>
  );
};

export default UserInfo;

const UserInfoWrapper = styled.View`
  flex-direction: row;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const UserInfoTextWrapper = styled.View`
  flex: 1;
  padding-left: 8px;
  padding-top: 12px;
`;

const UserName = styled.Text`
  color: #212121;
  font-size: 13px;
  font-family: Roboto;
  font-weight: 700;
`;
const UserEmail = styled.Text`
  color: rgba(33, 33, 33, 0.8);
  font-size: 11px;
  font-family: Roboto;
`;
