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
                <MyPageHeader/>
                <PersonalProfileContainer>
                    <PersonalProfile/>
                    <PersonalProfile/>
                </PersonalProfileContainer>

                <CoupleProfile/>
            </MyPageContainer>
        </>
    );
};

export default MyPage;

const MyPageContainer = styled(Container)`
  gap: 21px;
`;

const PersonalProfileContainer = styled(Container)`
  gap: 10px;
  display: flex;
  flex-direction: row;
`;
