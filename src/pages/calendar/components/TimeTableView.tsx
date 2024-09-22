import React from "react";
import styled from "styled-components";
import TimeStroke from "./TimeStroke";

const TimeTableView = () => {
  const mySchedule = [
    {
      title: "(내 일정 1)",
      startTime: "16:15",
      endTime: "4:00",
      scheduleBusyLevel: "여유",
      isCommon: false,
    },
    {
      title: "(공통 일정 1)",
      startTime: "6:15",
      endTime: "13:00",
      scheduleBusyLevel: "바쁨",
      isCommon: true,
    },
  ];

  const partnerSchedule = [
    {
      title: "(애인 일정 1)",
      startTime: "2:00",
      endTime: "4:00",
      scheduleBusyLevel: "보통",
      isCommon: false,
    },
    {
      title: "(공통 일정 1)",
      startTime: "6:15",
      endTime: "13:00",
      scheduleBusyLevel: "바쁨",
      isCommon: true,
    },
  ];

  const getScheduleBackColor = (scheduleBusyLevel: string) => {
    switch (scheduleBusyLevel) {
      case "여유":
        return "rgba(211, 237, 233, 0.50)";
      case "보통":
        return "rgba(255, 227, 192, 0.50)";
      case "바쁨":
        return "rgba(255, 207, 199, 0.50);";
      default:
        return "#fff";
    }
  };

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

  return (
    <TimeTableContainer>
      <TimeGridLeft>
        {Array.from({ length: 24 * 2 }, (_, i) => (
          <TimeSlot key={i}>
            <TimeLabel>{i % 2 === 0 ? `${Math.floor(i / 2)}` : ""}</TimeLabel>
          </TimeSlot>
        ))}
      </TimeGridLeft>

      <SchedulesContainer>
        {/* 내 일정 */}
        <ScheduleColumn>
          {mySchedule.map((schedule, index) => (
            <>
              <ScheduleItem
                key={index}
                backgroundColor={getScheduleBackColor(
                  schedule.scheduleBusyLevel
                )}
                isCommon={schedule.isCommon}
              >
                <BusyIcon
                  backgroundColor={getBusyColor(schedule.scheduleBusyLevel)}
                />
                {schedule.title}
              </ScheduleItem>
            </>
          ))}
        </ScheduleColumn>

        {/* 애인 일정 */}
        <ScheduleColumn>
          {partnerSchedule.map((schedule, index) => (
            <PartnerScheduleItem
              key={index}
              backgroundColor={getScheduleBackColor(schedule.scheduleBusyLevel)}
              isCommon={schedule.isCommon}
            >
              <BusyIcon
                backgroundColor={getBusyColor(schedule.scheduleBusyLevel)}
              />
              {schedule.title}
            </PartnerScheduleItem>
          ))}
        </ScheduleColumn>
      </SchedulesContainer>

      <TimeGridRight>
        {Array.from({ length: 24 * 2 }, (_, i) => (
          <TimeSlotRight key={i}>
            <TimeLabel>{i % 2 === 0 ? `${Math.floor(i / 2)}` : ""}</TimeLabel>
          </TimeSlotRight>
        ))}
      </TimeGridRight>
    </TimeTableContainer>
  );
};

export default TimeTableView;
const TimeTableContainer = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  border-radius: 15px;
  border: 1px solid var(--Gray, #585746);
  overflow: hidden;
`;

const TimeGridLeft = styled.div`
  display: grid;
  grid-template-rows: repeat(48, 25px);
  position: relative;
  width: 40px;
  border-right: 1px solid #878678;
  /* padding-top: 10px; */
`;

const TimeGridRight = styled(TimeGridLeft)`
  border-left: 1px solid #878678;
  border-right: none;
`;

const TimeSlot = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const TimeSlotRight = styled(TimeSlot)`
  justify-content: right;
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
  grid-template-columns: 1fr 1px 1fr;
  width: calc(100% - 80px);
  position: relative;
  height: 100%;
`;

const ScheduleColumn = styled.div`
  position: relative;
`;

const ScheduleItem = styled.div<{
  backgroundColor: string;
  isCommon?: boolean;
}>`
  display: flex;
  align-items: center;

  position: absolute;
  width: ${({ isCommon }) => (isCommon ? "90%" : "90%")};
  left: ${({ isCommon }) => (isCommon ? "50%" : "auto")};
  transform: ${({ isCommon }) => (isCommon ? "translateX(-50%)" : "none")};

  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ isCommon }) => (isCommon ? "20px" : "0px 20px 20px 0px")};
  padding: 10px;

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

const BusyIcon = styled.div<{
  backgroundColor: string;
}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  background-color: ${({ backgroundColor }) => backgroundColor};
`;
