import React, { useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { useFetchMyScheduleList } from "../../../hooks/useScheduleList";
import { getBusyColor } from "../../../utils/colors";
import { useRecoilValue } from "recoil";
import { myScheduleState } from "../../../atoms/scheduleState";

const ScheduleList = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const { isLoading, isError } = useFetchMyScheduleList(formattedDate);

  // 내 일정
  // const { data: myScheduleList } = useFetchMyScheduleList(formattedDate);
  const myScheduleList = useRecoilValue(myScheduleState);
  console.log(myScheduleList);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  const handleTodaySchedule = () => {
    navigate(`/calendar/${formattedDate}`);
  };

  const scheduleData = [
    {
      name: "(애칭) 의 현재 일정1",
      statusColor: "#fbbb6a",
      title: "(일정 이름)",
    },
    {
      name: "(애칭) 의 현재 일정2",
      statusColor: "#7bc96f",
      title: "(일정 이름)",
    },
    {
      name: "(애칭) 의 현재 일정3",
      statusColor: "#7bc96f",
      title: "(일정 이름)",
    },
  ];

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
                <img src={defaultCat} alt="Profile" />
              </ProfileImage>
              <TextWrapper>
                <NameText>(나)의 일정</NameText>
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
            <ScheduleInfo>
              <ProfileImage>
                <img src={defaultCat} alt="Profile" />
              </ProfileImage>
              <TextWrapper>
                <NameText>(나)의 일정</NameText>
                <Wrapper>
                  <ScheduleTitle>현재 일정이 없습니다.</ScheduleTitle>
                </Wrapper>
              </TextWrapper>
            </ScheduleInfo>
          )}

          {/* 애인 일정  */}
          <ScheduleInfo>
            <ProfileImage>
              <img src={defaultCat} alt="Profile" />
            </ProfileImage>
            <TextWrapper>
              <NameText>{scheduleData[index].name}</NameText>
              <Wrapper>
                <Status color={scheduleData[index].statusColor} />
                <ScheduleTitle>{scheduleData[index].title}</ScheduleTitle>
              </Wrapper>
            </TextWrapper>
          </ScheduleInfo>
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
