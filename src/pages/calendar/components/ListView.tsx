import React, { useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";

const ListView = () => {
  // 내 일정
  const mySchedule = [
    {
      title: "(내 일정 1)",
      startTime: "16:15",
      endTime: "4:00",
      scheduleBusyLevel: "여유",
      isCommon: false,
      isCompleted: 0,
    },
    {
      title: "(공통 일정 1)",
      startTime: "6:15",
      endTime: "13:00",
      scheduleBusyLevel: "바쁨",
      isCommon: true,
      isCompleted: 1,
    },
  ];

  // 애인의 일정
  const partnerSchedule = [
    {
      title: "(애인 일정 1)",
      startTime: "16:15",
      endTime: "4:00",
      scheduleBusyLevel: "여유",
      isCommon: false,
      isCompleted: 0,
    },
    {
      title: "(공통 일정 1)",
      startTime: "6:15",
      endTime: "13:00",
      scheduleBusyLevel: "바쁨",
      isCommon: true,
      isCompleted: 1,
    },
  ];

  const [mySchedules, setMySchedules] = useState(mySchedule);
  const [partnerSchedules, setPartnerSchedules] = useState(partnerSchedule);

  const getBusyColor = (scheduleBusyLevel: string) => {
    switch (scheduleBusyLevel) {
      case "여유":
        return "#51C7B4";
      case "보통":
        return "#FBBB6A";
      case "바쁨":
        return "#F14040";
      default:
        return "#fff";
    }
  };

  // 완료 상태 토글 함수
  const toggleCompletion = (
    schedules: typeof mySchedules,
    setSchedules: React.Dispatch<React.SetStateAction<typeof mySchedules>>,
    index: number,
    otherSchedules: typeof mySchedules,
    setOtherSchedules: React.Dispatch<React.SetStateAction<typeof mySchedules>>
  ) => {
    const updatedSchedules = schedules.map((schedule, i) => {
      if (i === index) {
        return {
          ...schedule,
          isCompleted: schedule.isCompleted === 0 ? 1 : 0,
        };
      }
      return schedule;
    });

    // 공통일정이면 상대방의 일정도 업데이트
    const updatedOtherSchedules = otherSchedules.map((schedule) => {
      if (schedule.isCommon) {
        return {
          ...schedule,
          isCompleted: updatedSchedules[index].isCompleted,
        };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
    setOtherSchedules(updatedOtherSchedules);
  };

  return (
    <ListContainer>
      {/* 내 일정  */}
      <Container>
        <Header>
          <ProfileImage src={defaultCat} alt="프로필" />{" "}
          <Wrapper>
            <Name>(애칭)의 일정</Name>
            <StatusContainer>
              <StatusItem>일정 {mySchedules.length}개</StatusItem>
              <StatusItem>
                완료 일정{" "}
                {mySchedules.filter((s) => s.isCompleted === 1).length}개
              </StatusItem>
              <StatusItem>
                미완료 일정{" "}
                {mySchedules.filter((s) => s.isCompleted === 0).length}개
              </StatusItem>
            </StatusContainer>
          </Wrapper>
        </Header>

        {/* 내 일정 목록 */}
        <ScheduleList>
          {mySchedules.map((schedule, index) => (
            <ScheduleItem key={index}>
              <ScheduleInfo>
                <ScheduleColor
                  color={getBusyColor(schedule.scheduleBusyLevel)}
                />
                <ScheduleTitle>{schedule.title}</ScheduleTitle>
              </ScheduleInfo>
              <StatusButton
                status={schedule.isCompleted}
                onClick={() =>
                  toggleCompletion(
                    mySchedules,
                    setMySchedules,
                    index,
                    partnerSchedules,
                    setPartnerSchedules
                  )
                }
              >
                {schedule.isCompleted === 1 ? "완료" : "미완료"}
              </StatusButton>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </Container>

      {/* 애인의 일정  */}
      <PartnerContainer>
        <Header>
          <ProfileImage src={defaultCat} alt="프로필" />{" "}
          <Wrapper>
            <Name>(애칭)의 일정</Name>
            <StatusContainer>
              <StatusItem>일정 {partnerSchedules.length}개</StatusItem>
              <StatusItem>
                완료 일정{" "}
                {partnerSchedules.filter((s) => s.isCompleted === 1).length}개
              </StatusItem>
              <StatusItem>
                미완료 일정{" "}
                {partnerSchedules.filter((s) => s.isCompleted === 0).length}개
              </StatusItem>
            </StatusContainer>
          </Wrapper>
        </Header>

        {/* 애인 일정 목록 */}
        <ScheduleList>
          {partnerSchedules.map((schedule, index) => (
            <ScheduleItem key={index}>
              <ScheduleInfo>
                <ScheduleColor
                  color={getBusyColor(schedule.scheduleBusyLevel)}
                />
                <ScheduleTitle>{schedule.title}</ScheduleTitle>
              </ScheduleInfo>
              <StatusButton
                status={schedule.isCompleted}
                onClick={() =>
                  toggleCompletion(
                    partnerSchedules,
                    setPartnerSchedules,
                    index,
                    mySchedules,
                    setMySchedules
                  )
                }
              >
                {schedule.isCompleted === 1 ? "완료" : "미완료"}
              </StatusButton>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </PartnerContainer>
    </ListContainer>
  );
};

export default ListView;

const ListContainer = styled.div`
  width: 90%;
  gap: 13px;
`;

const Container = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const PartnerContainer = styled(Container)`
  margin-top: 13px;
  background: var(--Secondary, #ffcfc7);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Name = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  padding: 11.669px 10.5px 12.494px 11.5px;
  margin-right: 10px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 5.7px 0px rgba(0, 0, 0, 0.25);
`;

const StatusContainer = styled.div`
  display: flex;
  padding: 5px 12px 4px 11px;
  justify-content: center;
  gap: 25px;
  border-radius: 20px;
  background: #f25454;
`;

const StatusItem = styled.div`
  color: #fff;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ScheduleList = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  gap: 9px;
`;

const ScheduleItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ScheduleColor = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 4px;
`;

const ScheduleTitle = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StatusButton = styled.div<{ status: number }>`
  padding: 2px 16px 1px 14px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  background-color: ${({ status }) => (status === 1 ? "#FFF" : "#F25454")};
  color: ${({ status }) => (status === 1 ? "#F25454" : "#FFF")};
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;
