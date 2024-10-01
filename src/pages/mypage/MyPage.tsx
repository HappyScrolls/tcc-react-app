import React from "react";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";
import MyPageHeader from "./components/MyPageHeader";
import PersonalProfile from "./components/PersonalProfile";
import CoupleProfile from "./components/CoupleProfile";
import { useMemberInfoQuery } from "../../hooks/useMemberInfo";
import { useFetchMyLoverInfo } from "../../hooks/useCoupleInfo";

const MyPage = () => {
  const { data: memberInfo } = useMemberInfoQuery();
  const { data: loverInfo } = useFetchMyLoverInfo();

  const partnerExists = !!loverInfo;

  return (
    <MyPageContainer>
      <MyPageHeader />

      <PersonalProfileContainer>
        {/* 내 프로필 */}
        <PersonalProfile
          isMyProfile={true}
          profileData={memberInfo}
          partnerExists={true}
        />

        {/* 애인 프로필 또는 초대 링크 */}
        <PersonalProfile
          isMyProfile={false}
          profileData={loverInfo}
          partnerExists={partnerExists}
          inviteLink={"your-kakao-invite-link-here"}
        />
      </PersonalProfileContainer>

      {/* 커플 프로필 또는 등록 안내 */}
      <CoupleProfile memberInfo={memberInfo} loverInfo={loverInfo} />
    </MyPageContainer>
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
