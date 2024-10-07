import React, { Suspense } from "react";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";
import MyPageHeader from "./components/MyPageHeader";
import PersonalProfile from "./components/PersonalProfile";
import CoupleProfile from "./components/CoupleProfile";
import { useMemberInfoQuery } from "../../hooks/useMemberInfo";
import { useFetchMyLoverInfo } from "../../hooks/useCoupleInfo";

const MyPage = () => {
  const { data: memberInfo } = useMemberInfoQuery();
  const { data: loverInfo, isError } = useFetchMyLoverInfo();

  if (isError) {
    return <div>데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</div>;
  }

  const partnerExists = !!loverInfo;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MyPageContainer>
          <MyPageHeader />
          <PersonalProfileContainer>
            {/* 내 프로필 */}
            <PersonalProfile
              isMyProfile={true}
              profileData={memberInfo}
              partnerExists={true}
            />

            {/* 애인 프로필 */}
            <PersonalProfile
              isMyProfile={false}
              profileData={loverInfo}
              partnerExists={partnerExists}
            />
          </PersonalProfileContainer>

          {/* 커플 프로필 */}
          <CoupleProfile memberInfo={memberInfo} loverInfo={loverInfo} />
        </MyPageContainer>
      </Suspense>
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
