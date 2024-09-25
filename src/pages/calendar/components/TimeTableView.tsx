import React, { useRef, useState } from "react";
import styled from "styled-components";
import phone from "../../../images/calendar/phone.svg";
import { getBusyBackgroundColor, getBusyColor } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import {
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../../hooks/useScheduleList";
import TimeTableHeader from "./TimeTableHeader";
import { ScheduleData } from "../../../types/ISchedule";

// (1시간 = 26px)
const timeToPosition = (dateTime: string): number => {
  if (!dateTime || !dateTime.includes("T")) {
    console.error("유효하지 않은 값 :", dateTime);
    return 0;
  }

  const time = dateTime.split("T")[1];
  if (!time) {
    console.error("유효하지 않은 값 :", dateTime);
    return 0;
  }

  const [hour, minute] = time.split(":").map(Number);

  if (isNaN(hour) || isNaN(minute)) {
    console.error("유효하지 않은 값 :", dateTime);
    return 0;
  }

  return ((hour * 60 + minute) / 60) * 26;
};

// 타입 정의
interface ScheduleItemProps {
  top: number;
  height: number;
  backgroundcolor: string;
  $isCommon?: boolean;
  $isPartner?: boolean;
}

type ModalType = "empty" | "schedule" | null;

const TimeTableView: React.FC<{ date: string }> = ({ date }) => {
  const { data: myScheduleList } = useFetchMyScheduleList(date);
  const { data: partnerScheduleList } = useFetchPartnerScheduleList(date);

  console.log(partnerScheduleList);
  const commonSchedules = [
    ...(myScheduleList || []),
    ...(partnerScheduleList || []),
  ].filter((schedule) => schedule.isCommon);

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [touchStartY, setTouchStartY] = useState(0);

  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData | null>(
    null
  );

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedSchedule(null);
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

  const openAddSchedule = () => {
    navigate(`/calendar/${date}/add`);
    closeModal();
  };

  const openAddCoupleSchedule = () => {
    navigate(`/calendar/${date}/add/couple`);
    closeModal();
  };

  return (
    <>
      {/* 헤더  */}
      <TimeTableHeader />
      <TableContainer>
        {/* 왼쪽 시간 그리드 */}
        <LeftTimeGrid>
          {Array.from({ length: 24 }, (_, i) => (
            <TimeSlot key={i}>{i}</TimeSlot>
          ))}
        </LeftTimeGrid>

        <ScheduleContainer>
          {/* 내 일정  */}
          <ScheduleColumn onClick={() => openModal("empty")}>
            {myScheduleList
              .filter((schedule) => !schedule.isCommon)
              .map((schedule, index) => (
                <ScheduleItem
                  key={index}
                  top={timeToPosition(schedule.scheduleStartAt)}
                  height={
                    timeToPosition(schedule.scheduleEndAt) -
                    timeToPosition(schedule.scheduleStartAt)
                  }
                  backgroundcolor={getBusyBackgroundColor(schedule.busyLevel)}
                  $isCommon={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSchedule(schedule);
                    openModal("schedule");
                  }}
                >
                  <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                  <ScheduleName>{schedule.scheduleName}</ScheduleName>
                </ScheduleItem>
              ))}
          </ScheduleColumn>

          <MiddleLine />

          {/* 공통 일정  */}
          <CommonScheduleColumn>
            {commonSchedules?.map((schedule) => (
              <CommonScheduleItem
                key={schedule.scheduleNo}
                top={timeToPosition(schedule.scheduleStartAt)}
                height={
                  timeToPosition(schedule.scheduleEndAt) -
                  timeToPosition(schedule.scheduleStartAt)
                }
                backgroundcolor={getBusyBackgroundColor(schedule.busyLevel)}
                $isCommon
              >
                <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                <ScheduleName>{schedule.scheduleName}</ScheduleName>
              </CommonScheduleItem>
            ))}
          </CommonScheduleColumn>

          {/* 애인 일정  */}
          <ScheduleColumn>
            {partnerScheduleList
              .filter((schedule) => !schedule.isCommon)
              .map((schedule, index) => (
                <ScheduleItem
                  key={index}
                  top={timeToPosition(schedule.scheduleStartAt)}
                  height={
                    timeToPosition(schedule.scheduleEndAt) -
                    timeToPosition(schedule.scheduleStartAt)
                  }
                  backgroundcolor={getBusyBackgroundColor(schedule.busyLevel)}
                  $isPartner={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSchedule(schedule);
                    openModal("schedule");
                  }}
                >
                  <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
                  <ScheduleName>{schedule.scheduleName}</ScheduleName>
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
              <Button onClick={openAddSchedule}>내 일정 추가</Button>
              <CommonButton onClick={openAddCoupleSchedule}>
                공통 일정 추가
              </CommonButton>
            </SheetContent>
          </BottomSheet>
        </Overlay>
      )}
      {/* 일정 상세 모달 */}
      {activeModal === "schedule" && selectedSchedule && (
        <Overlay onClick={handleOutsideClick} onTouchEnd={handleTouchEnd}>
          <ScheduleDetailModal
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            busyLevel={selectedSchedule.busyLevel}
          >
            <ScheduleContent>
              <BlackLine />
              <ModalWrapper>
                <BusyTag
                  backgroundColor={getBusyColor(selectedSchedule.busyLevel)}
                />
                <Title>{selectedSchedule.scheduleName}</Title>
                <Phone src={phone} />
              </ModalWrapper>

              <TextWrapper>
                <Text> {selectedSchedule.scheduleLocation}</Text>
                <SmallText>{selectedSchedule.scheduleWith}</SmallText>
                <SmallText>
                  {new Date(
                    selectedSchedule.scheduleStartAt
                  ).toLocaleTimeString()}
                  ~
                  {new Date(
                    selectedSchedule.scheduleEndAt
                  ).toLocaleTimeString()}
                </SmallText>
                <WeekText>{selectedSchedule.groupGenderType}</WeekText>
                {selectedSchedule.isCommon && <Text>공통 일정입니다</Text>}
              </TextWrapper>

              <BtnWrapper>
                {/* 내 일정일 때 */}
                {myScheduleList?.includes(selectedSchedule) && (
                  <>
                    <DeleteButton>일정 삭제</DeleteButton>
                    <ActionButton>일정 수정</ActionButton>
                    {!selectedSchedule.isCommon && (
                      <ActionButton>공통 일정으로 변경</ActionButton>
                    )}
                  </>
                )}

                {/* 애인 일정일 때  */}
                {partnerScheduleList?.includes(selectedSchedule) && (
                  <>
                    <DeleteButton>일정 수정 요청</DeleteButton>
                    <ActionButton>이모지 남기기</ActionButton>
                    {!selectedSchedule.isCommon && (
                      <ActionButton>공통 일정으로 변경</ActionButton>
                    )}
                  </>
                )}

                {/* 공통 일정일 때 */}
                {selectedSchedule.isCommon && (
                  <>
                    <DeleteButton>일정 삭제</DeleteButton>
                    <ActionButton>일정 수정</ActionButton>
                    <ActionButton>이모지 남기기</ActionButton>
                  </>
                )}
              </BtnWrapper>
            </ScheduleContent>
          </ScheduleDetailModal>
        </Overlay>
      )}
    </>
  );
};

export default TimeTableView;

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

  &:last-child {
    border-bottom: none;
  }
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
  width: ${({ $isCommon }) => ($isCommon ? "300%" : "150%")};
  left: ${({ $isCommon }) => ($isCommon ? "auto" : "auto")};
  right: ${({ $isPartner }) => ($isPartner ? "0" : "auto")};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  border-radius: ${({ $isCommon, $isPartner }) =>
    $isCommon
      ? "20px"
      : $isPartner
        ? "20px 0px 0px 20px"
        : "0px 20px 20px 0px"};
  padding: 5px;

  display: flex;
  align-items: flex-start;
  justify-content: ${({ $isPartner }) =>
    $isPartner ? "flex-end" : "flex-start"};
  text-align: ${({ $isPartner }) => ($isPartner ? "right" : "left")};

  cursor: pointer;
`;

const ScheduleName = styled.div`
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

const ScheduleDetailModal = styled(BottomSheet)<{ busyLevel: string }>`
  height: 440px;
  border: 1px solid ${({ busyLevel }) => getBusyColor(busyLevel)};
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

const SmallText = styled(Text)`
  font-size: 12px;
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
  background: var(--Secondary, #ffcfc7);
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
