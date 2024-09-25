import React, { useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { getBusyColor } from "../../../utils/colors";

import {
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../../hooks/useScheduleList";
import { useFetchMyLoverInfo } from "../../../hooks/useCoupleInfo";
import { useMemberInfoQuery } from "../../../hooks/useMemberInfo";

const ScheduleList = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // 내 일정
  const { data: myScheduleList, isError: myScheduleError } =
    useFetchMyScheduleList(formattedDate);

  // 애인 일정
  const { data: partnerScheduleList, isError: partnerScheduleError } =
    useFetchPartnerScheduleList(formattedDate);

  // 내 정보
  const { data: myInfo, isError: myInfoError } = useMemberInfoQuery();

  // 애인 정보
  const { data: loverInfo, isError: myLoverError } = useFetchMyLoverInfo();

  if (myScheduleError || partnerScheduleError || myLoverError) {
    return <div>일정 데이터를 가져오는 중 오류가 발생했습니다.</div>;
  }

  const handleTodaySchedule = () => {
    navigate(`/calendar/${formattedDate}`);
  };

  return (
    <ScheduleBox>
      <DayWrapper>
        <DateText>
          {year}.{month}.{day}
        </DateText>
        <DdayText>오늘의 일정</DdayText>
      </DayWrapper>

      <ScheduleContainer>
        <ArrowLeft onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}>
          {"<"}
        </ArrowLeft>
        <ScheduleWrapper>
          {/* 내 일정  */}
          {myScheduleList && myScheduleList[index] ? (
            <ScheduleInfo>
              <ProfileImage>
                <img
                  src={myInfo.profilePhoto ? myInfo.profilePhoto : defaultCat}
                  alt="Profile"
                />
              </ProfileImage>
              <TextWrapper>
                <NameText>{myInfo.name}의 일정</NameText>
                <Wrapper>
                  <Status
                    color={getBusyColor(myScheduleList[index].busyLevel)}
                  />
                  <ScheduleTitle>
                    {myScheduleList[index].scheduleName}
                  </ScheduleTitle>
                </Wrapper>
              </TextWrapper>
            </ScheduleInfo>
          ) : (
            <div>현재 애인의 일정이 없습니다.</div>
          )}

          {/* 애인 일정  */}
          {partnerScheduleList && partnerScheduleList[index] ? (
            <PartnerScheduleInfo>
              <ProfileImage>
                <img
                  src={
                    loverInfo?.profilePhoto
                      ? loverInfo.profilePhoto
                      : defaultCat
                  }
                  alt="Profile"
                />
              </ProfileImage>
              <TextWrapper>
                <NameText>{loverInfo?.name}의 일정</NameText>
                <Wrapper>
                  <Status
                    color={getBusyColor(partnerScheduleList[index].busyLevel)}
                  />
                  <ScheduleTitle>
                    {partnerScheduleList[index].scheduleName}
                  </ScheduleTitle>
                </Wrapper>
              </TextWrapper>
            </PartnerScheduleInfo>
          ) : (
            <div>현재 애인의 일정이 없습니다.</div>
          )}
        </ScheduleWrapper>
        <ArrowRight
          onClick={() =>
            setIndex((prev) => Math.min(prev + 1, myScheduleList.length - 1))
          }
        >
          {">"}
        </ArrowRight>
      </ScheduleContainer>

      <Button onClick={handleTodaySchedule}>오늘의 일정 확인</Button>
    </ScheduleBox>
  );
};

export default ScheduleList;

const ScheduleBox = styled.div`
  width: 320px;
  padding: 15px 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const DateText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 700;
`;

const DdayText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-weight: 700;
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
`;

const ArrowLeft = styled.div`
  position: absolute;
  left: -20px;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
`;

const ArrowRight = styled.div`
  position: absolute;
  right: -20px;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
`;

const Button = styled.button`
  display: flex;
  width: 223px;
  padding: 8px 72px;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #f25454;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #fff;
  font-family: SUIT;
  font-size: 12px;
  font-weight: 700;
`;

const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  width: 223px;
  height: 65px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid var(--Secondary, #ffcfc7);
  gap: 10px;
`;

const PartnerScheduleInfo = styled(ScheduleInfo)`
  border: 1px solid #f25454;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NameText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Status = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProfileImage = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 23px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 30px;
    height: 30px;
  }
`;

const ScheduleTitle = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 8px;
  font-weight: 700;
`;
