import React from "react";
import styled from "styled-components";

// Schedule 데이터
const TimeTableView = () => {
  const mySchedule = [
    {
      title: "(내 일정 1)",
      startTime: 2,
      endTime: 4,
      scheduleBusyLevel: "여유",
    },
    {
      title: "(내 일정 2)",
      startTime: 8,
      endTime: 10,
      scheduleBusyLevel: "보통",
    },
  ];

  const partnerSchedule = [
    {
      title: "(애인 일정 1)",
      startTime: 2,
      endTime: 4,
      scheduleBusyLevel: "바쁨",
    },
    {
      title: "(애인 일정 2)",
      startTime: 9,
      endTime: 11,
      scheduleBusyLevel: "여유",
    },
  ];

  const commonSchedule = [
    {
      title: "(공통 일정)",
      startTime: 13,
      endTime: 15,
      scheduleBusyLevel: "보통",
    },
  ];

  // 배경 설정
  const getScheduleColor = (scheduleBusyLevel: string) => {
    switch (scheduleBusyLevel) {
      case "여유":
        return "rgba(211, 237, 233, 0.50)";
      case "보통":
        return "rgba(255, 227, 192, 0.50)";
      case "바쁨":
        return "rgba(255, 207, 199, 0.50)";
      default:
        return "#fff";
    }
  };

  return (
    <TimeTableContainer>
      {/* 왼쪽 시간 그리드 */}
      <TimeGridLeft>
        {Array.from({ length: 24 * 2 }, (_, i) => (
          <TimeSlot key={i} thick={i % 2 === 0}>
            <TimeLabel>{i % 2 === 0 ? `${Math.floor(i / 2)}` : ""}</TimeLabel>
          </TimeSlot>
        ))}
      </TimeGridLeft>

      <SchedulesContainer>
        {/* 내 일정 */}
        <ScheduleColumn>
          {mySchedule.map((schedule, index) => (
            <ScheduleItem
              key={index}
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              backgroundColor={getScheduleColor(schedule.scheduleBusyLevel)}
            >
              {schedule.title}
            </ScheduleItem>
          ))}
        </ScheduleColumn>

        <MiddleLine />

        {/* 공통 일정 */}
        <CommonScheduleColumn>
          {commonSchedule.map((schedule, index) => (
            <ScheduleItem
              key={index}
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              backgroundColor={getScheduleColor(schedule.scheduleBusyLevel)}
              isCommon={true}
            >
              {schedule.title}
            </ScheduleItem>
          ))}
        </CommonScheduleColumn>

        {/* 애인 일정 */}
        <ScheduleColumn>
          {partnerSchedule.map((schedule, index) => (
            <PartnerScheduleItem
              key={index}
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              backgroundColor={getScheduleColor(schedule.scheduleBusyLevel)}
            >
              {schedule.title}
            </PartnerScheduleItem>
          ))}
        </ScheduleColumn>
      </SchedulesContainer>

      {/* 오른쪽 시간 그리드 */}
      <TimeGridRight>
        {Array.from({ length: 24 * 2 }, (_, i) => (
          <TimeSlot key={i} thick={i % 2 === 0}>
            <TimeLabel>{i % 2 === 0 ? `${Math.floor(i / 2)}` : ""}</TimeLabel>
          </TimeSlot>
        ))}
      </TimeGridRight>
    </TimeTableContainer>
  );
};

export default TimeTableView;

// Styled Components
const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  border-radius: 15px;
  border: 1px solid var(--Gray, #585746);
`;

const TimeGridLeft = styled.div`
  display: grid;
  grid-template-rows: repeat(48, 20px);
  position: relative;
  width: 40px;
  z-index: 2;
  border-right: 1px solid #878678;
`;

const TimeGridRight = styled(TimeGridLeft)`
  position: relative;
  border-right: none;
  border-left: 1px solid #878678;
  width: 40px;
`;

const TimeSlot = styled.div<{ thick: boolean }>`
  border-bottom: ${({ thick }) =>
    thick ? "1px dashed #878678" : "0.5px dashed #878678"};
  height: 20px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const TimeLabel = styled.div`
  color: #878678;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 4px;
`;

const SchedulesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100% - 80px);
  position: relative;
  height: 960px;
`;

const ScheduleColumn = styled.div`
  position: relative;
`;

const CommonScheduleColumn = styled.div`
  position: relative;
  width: 100%;
`;

const MiddleLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #878678;
`;

const ScheduleItem = styled.div<{
  startTime: number;
  endTime: number;
  backgroundColor: string;
  isCommon?: boolean;
}>`
  position: absolute;
  top: ${({ startTime }) => startTime * 40}px;
  height: ${({ startTime, endTime }) => (endTime - startTime) * 40}px;
  width: ${({ isCommon }) => (isCommon ? "90%" : "90%")};
  left: ${({ isCommon }) => (isCommon ? "5%" : "auto")};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0px 20px 20px 0px;
  padding: 10px;
  z-index: 1;

  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PartnerScheduleItem = styled(ScheduleItem)`
  border-radius: 20px 0px 0px 20px;
`;
