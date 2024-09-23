import React, { useRef, useState } from "react";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import phone from "../../../images/calendar/phone.svg";
import { getBusyBackgroundColor, getBusyColor } from "../../../utils/colors";

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

type ModalType = "empty" | "schedule" | null;

const TimeTableView: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null); 
  const [touchStartY, setTouchStartY] = useState(0); 

  const modalRef = useRef<HTMLDivElement>(null); 

  const openModal = (type: ModalType) => {
    setActiveModal(type);
  };


  const closeModal = () => {
    setActiveModal(null);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };


  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchEndY - touchStartY > 100) {
      closeModal();
    }
  };

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
          <ScheduleColumn onClick={() => openModal("empty")}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("schedule");
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("schedule");
                  }}
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
      {/* 일정 추가 모달 */}
      {activeModal === "empty" && (
        <Overlay onClick={handleOutsideClick} onTouchEnd={handleTouchEnd}>
          <BottomSheet
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <SheetContent>
              <Line />
              <Button onClick={closeModal}>내 일정 추가</Button>
              <CommonButton onClick={closeModal}>공통 일정 추가</CommonButton>
            </SheetContent>
          </BottomSheet>
        </Overlay>
      )}

      {/* 일정 상세 모달 */}
      {activeModal === "schedule" && (
        <Overlay onClick={handleOutsideClick} onTouchEnd={handleTouchEnd}>
          <ScheduleDetailModal
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <ScheduleContent>
              <BlackLine />
              <ModalWrapper>
                <BusyTag backgroundColor={getBusyColor("바쁨")} />
                <Title>(일정 이름)</Title> <Phone src={phone} />
              </ModalWrapper>

              <TextWrapper>
                <Text>(장소)</Text>
                <Text>(사람)</Text>
                <TimeText>(00:00~00:00)</TimeText>
                <WeekText>(매주 수요일마다)</WeekText>
              </TextWrapper>
              <BtnWrapper>
                <DeleteButton>일정 삭제</DeleteButton>
                <ActionButton>일정 수정</ActionButton>
                <ActionButton>공통 일정으로 변경</ActionButton>
              </BtnWrapper>
            </ScheduleContent>
          </ScheduleDetailModal>
        </Overlay>
      )}
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

// 모달
const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  width: 85%;
  background: #fff;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid #f25454;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  animation: slide-up 0.3s ease-out;
  z-index: 5;
  height: 235px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ScheduleDetailModal = styled(BottomSheet)`
  height: 440px;
`;

const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 12px;
`;

const Line = styled.div`
  width: 53px;
  height: 5px;
  margin: 0 auto;
  border-radius: 30px;
  background: var(--Secondary, #ffcfc7);

  margin-bottom: 40px;
`;

const BlackLine = styled(Line)`
  background: #4d3f2c;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 12px 0px 13px 0px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CommonButton = styled(Button)`
  background: var(--Secondary, #ffcfc7);
`;

const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 90%;
  margin-left: 12px;
`;

const Text = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TimeText = styled.div`
  color: var(--Black, #3b3634);

  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const WeekText = styled.div`
  color: var(--Black, #3b3634);

  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ActionButton = styled(Button)`
  border-radius: 10px;
  background: #fff;

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--Black, #3b3634);

  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DeleteButton = styled(ActionButton)`
  border-radius: 10px;
  background: var(--Secondary, #ffcfc7);

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const Phone = styled.img`
  width: 20.299px;
  height: 27.463px;
  flex-shrink: 0;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  gap: 12px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  margin-top: 40px;
`;
