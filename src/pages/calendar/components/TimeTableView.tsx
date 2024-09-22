import React from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";

// 일정 데이터 예시
interface Schedule {
  title: string;
  startTime: string;
  endTime: string;
  busyLevel: string;
  isCommon: boolean;
}

const mySchedule: Schedule[] = [
  {
    title: "(내 일정 1)",
    startTime: "2:00",
    endTime: "4:00",
    busyLevel: "여유",
    isCommon: false,
  },
  {
    title: "(내 일정 2)",
    startTime: "5:00",
    endTime: "8:00",
    busyLevel: "여유",
    isCommon: false,
  },
  {
    title: "(공통 일정)",
    startTime: "11:00",
    endTime: "14:00",
    busyLevel: "보통",
    isCommon: true,
  },
];

const partnerSchedule: Schedule[] = [
  {
    title: "(애인 일정 1)",
    startTime: "3:00",
    endTime: "5:00",
    busyLevel: "바쁨",
    isCommon: false,
  },
  {
    title: "(공통 일정)",
    startTime: "11:00",
    endTime: "14:00",
    busyLevel: "보통",
    isCommon: true,
  },
];

// 바쁜 정도에 따른 색상 반환
const getBusyBackgroundColor = (level: string): string => {
  switch (level) {
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

// 시간을 픽셀 단위로 변환 (1시간 = 26px)
const timeToPosition = (time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  return ((hour * 60 + minute) / 60) * 26; // 1시간 26px
};

// 타입 정의
interface ScheduleItemProps {
  top: number;
  height: number;
  backgroundColor: string;
  isCommon?: boolean;
  isPartner?: boolean;
}

const TimeTableView: React.FC = () => {
  return (
    <>
      <Header>
        <Wrapper>
          <ProfileImage src={defaultCat} alt="프로필" />{" "}
          <Name>(나(애칭))의 일정 </Name>
        </Wrapper>

        <Wrapper>
          <Name>(애인(애칭))의 일정 </Name>
          <ProfileImage src={defaultCat} alt="프로필" />
        </Wrapper>
      </Header>

      <TableContainer>
        {/* 왼쪽 시간 그리드 */}
        <LeftTimeGrid>
          {Array.from({ length: 24 }, (_, i) => (
            <TimeSlot key={i}>{i}</TimeSlot>
          ))}
        </LeftTimeGrid>

        <ScheduleContainer>
          <ScheduleColumn>
            {mySchedule
              .filter((schedule) => !schedule.isCommon)
              .map((schedule, index) => (
                <ScheduleItem
                  key={index}
                  top={timeToPosition(schedule.startTime)}
                  height={
                    timeToPosition(schedule.endTime) -
                    timeToPosition(schedule.startTime)
                  }
                  backgroundColor={getBusyBackgroundColor(schedule.busyLevel)}
                  isCommon={false} // 내 일정인 경우
                >
                  <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                  {schedule.title}
                </ScheduleItem>
              ))}
          </ScheduleColumn>

          <MiddleLine />

          <CommonScheduleColumn>
            {mySchedule
              .filter((schedule) => schedule.isCommon)
              .map((schedule, index) => (
                <CommonScheduleItem
                  key={index}
                  top={timeToPosition(schedule.startTime)}
                  height={
                    timeToPosition(schedule.endTime) -
                    timeToPosition(schedule.startTime)
                  }
                  backgroundColor={getBusyBackgroundColor(schedule.busyLevel)}
                  isCommon
                >
                  <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                  {schedule.title}
                </CommonScheduleItem>
              ))}
          </CommonScheduleColumn>

          <ScheduleColumn>
            {partnerSchedule
              .filter((schedule) => !schedule.isCommon)
              .map((schedule, index) => (
                <ScheduleItem
                  key={index}
                  top={timeToPosition(schedule.startTime)}
                  height={
                    timeToPosition(schedule.endTime) -
                    timeToPosition(schedule.startTime)
                  }
                  backgroundColor={getBusyBackgroundColor(schedule.busyLevel)}
                  isPartner={true}
                >
                  <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                  {schedule.title}
                </ScheduleItem>
              ))}
          </ScheduleColumn>
        </ScheduleContainer>

        {/* 오른쪽 시간 그리드 */}
        <RightTimeGrid>
          {Array.from({ length: 24 }, (_, i) => (
            <TimeSlot key={i}>{i}</TimeSlot>
          ))}
        </RightTimeGrid>
      </TableContainer>
    </>
  );
};

export default TimeTableView;

const Header = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;

  margin-top: 5px;
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
  width: 54px;
  height: 54px;
  padding: 11.669px 10.5px 12.494px 11.5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 5.7px 0px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TableContainer = styled.div`
  display: flex;
  width: 90%;
  position: relative;
  border-radius: 15px;
  border: 1px solid var(--Gray, #585746);
`;

const LeftTimeGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;

  border-right: #878678 1px solid;
`;

const RightTimeGrid = styled(LeftTimeGrid)`
  border-right: none;
  border-left: #878678 1px solid;
`;

const TimeSlot = styled.div`
  height: 26px; /* 1시간 = 26px */
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 4px;

  color: #878678;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  border-bottom: #878678 1px dashed;
`;

const ScheduleContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
`;

const ScheduleColumn = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CommonScheduleColumn = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//  공통일정 표시
const ScheduleItem = styled.div<ScheduleItemProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  height: ${({ height }) => height}px;
  width: ${({ isCommon }) => (isCommon ? "300%" : "150%")};
  left: ${({ isCommon }) => (isCommon ? "auto" : "auto")};
  right: ${({ isPartner }) => (isPartner ? "0" : "auto")};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ isCommon, isPartner }) =>
    isCommon ? "20px" : isPartner ? "20px 0px 0px 20px" : "0px 20px 20px 0px"};
  padding: 9px;

  display: flex;
  align-items: flex-start;
  justify-content: ${({ isPartner }) =>
    isPartner ? "flex-end" : "flex-start"};
  text-align: ${({ isPartner }) => (isPartner ? "right" : "left")};

  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CommonScheduleItem = styled(ScheduleItem)`
  z-index: 3;
`;

const MiddleLine = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 100%;
  position: absolute;
  left: 50%;
  z-index: 1;
`;

const BusyTag = styled.div<{ backgroundColor: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 2px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
