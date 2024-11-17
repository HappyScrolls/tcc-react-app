import React from "react";
import { styled } from "styled-components";
import { useMemberInfoQuery } from "../../../hooks/useMemberInfo";
import { useFetchMyLoverInfo } from "../../../hooks/useCoupleInfo";
import defaultCat from "../../../images/signup/defaultCat.svg";

const TimeTableHeader = () => {
  const { data: myInfo } = useMemberInfoQuery();
  const { data: loverInfo } = useFetchMyLoverInfo();

  return (
    <>
      <Header>
        <Wrapper>
          <ProfileImage
            src={myInfo.profilePhoto ? myInfo.profilePhoto : defaultCat}
            alt="프로필"
          />
          <Name>{myInfo.name}의 일정 </Name>
        </Wrapper>

        <Wrapper>
          <Name>{loverInfo?.name}의 일정 </Name>
          <ProfileImage
            src={loverInfo?.profilePhoto ? loverInfo.profilePhoto : defaultCat}
            alt="프로필"
          />
        </Wrapper>
      </Header>
    </>
  );
};

export default TimeTableHeader;

const Header = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;

  margin-top: 3px;
`;

const Name = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  padding: 5px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 11px 10px 12px 11px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 5.7px 0px rgba(0, 0, 0, 0.25);

  object-fit: cover;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
