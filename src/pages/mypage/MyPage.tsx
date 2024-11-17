import React from "react";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";
import MyPageHeader from "./components/MyPageHeader";
import PersonalProfile from "./components/PersonalProfile";
import CoupleProfile from "./components/CoupleProfile";
import {useMemberInfoQuery} from "../../hooks/useMemberInfo";
import {useFetchMyLoverInfo} from "../../hooks/useCoupleInfo";

const MyPage = () => {
    const userInfo= useMemberInfoQuery()
    const loverInfo=useFetchMyLoverInfo()

    const userInfoProp={
        name:userInfo.data.name,
        profileImg:userInfo.data.profilePhoto,
        birthDate:userInfo.data.birthDate,
        isMine: true
    }
    const loverInfoProp={
        name:loverInfo.data.name,
        profileImg:loverInfo.data.profilePhoto,
        birthDate:loverInfo.data.birthDate,
        isMine: false
    }

    return (
        <>
            <MyPageContainer>
                <MyPageHeader/>
                <PersonalProfileContainer>
                    <PersonalProfile
                        name={userInfo.data.name}
                        profileImg={userInfo.data.profilePhoto}
                        birthDate={userInfo.data.birthDate}
                        isMine={true}/>
                    <PersonalProfile
                        name={loverInfo.data.name}
                        profileImg={loverInfo.data.profilePhoto}
                        birthDate={loverInfo.data.birthDate}
                        isMine={false}/>
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
