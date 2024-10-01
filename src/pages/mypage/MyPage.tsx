import React from "react";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";
import MyPageHeader from "./components/MyPageHeader";
import PersonalProfile from "./components/PersonalProfile";
import CoupleProfile from "./components/CoupleProfile";

const MyPage = () => {
  return (
    <>
      <MyPageContainer>
        <MyPageHeader />
        <PersonalProfileContainer>
          {/* 내 프로필  */}
          <PersonalProfile isMyProfile={true} />

          {/* 애인 프로필  */}
          <PersonalProfile isMyProfile={false} />
        </PersonalProfileContainer>

        <CoupleProfile />
      </MyPageContainer>
    </>
  );
};

export default MyPage;

const MyPageContainer = styled(Container)`
  gap: 21px;
`;

const PersonalProfileContainer = styled(Container)`
  gap: 25px;
  display: flex;
  flex-direction: row;
`;
