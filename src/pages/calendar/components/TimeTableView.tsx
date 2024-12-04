import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getBusyBackgroundColor, getBusyColor } from "../../../utils/colors";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFetchCommonScheduleList,
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../../hooks/useScheduleList";
import TimeTableHeader from "./TimeTableHeader";
import { ScheduleData } from "../../../types/ISchedule";
import { useDeleteSchedule } from "../../../hooks/useDeleteSchedule";
import { useChangeCommonSchedule } from "../../../hooks/useChangeCoupleSchedule";
import { timeToPosition } from "../../../utils/timePosition";
import TimeTableModals from "./TimeTableModals";

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
  // 일정 데이터
  const { data: myScheduleList, refetch: refetchMyScheduleList } =
    useFetchMyScheduleList(date);
  const { data: partnerScheduleList, refetch: refetchPartnerScheduleList } =
    useFetchPartnerScheduleList(date);
  const { data: commonScheduleList, refetch: refetchCommonScheduleList } =
    useFetchCommonScheduleList(date);

  // 함수 (일정 삭제, 공통일정 변경)
  const { mutate: deleteSchedule } = useDeleteSchedule();
  const { mutate: changeCommonSchedule } = useChangeCommonSchedule();

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [, setIsClosing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangeCommonModalOpen, setIsChangeCommonModalOpen] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData | null>(
    null
  );

  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const [, setSelectedEmoji] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.refetch) {
      refetchMyScheduleList();
      refetchPartnerScheduleList();

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, refetchMyScheduleList, refetchPartnerScheduleList]);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    setIsClosing(false);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedSchedule(null);
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 300);
  };

  // 일정 삭제
  const handleDeleteSchedule = () => {
    if (selectedSchedule?.scheduleNo) {
      deleteSchedule(selectedSchedule.scheduleNo, {
        onSuccess: () => {
          closeModal();
          refetchMyScheduleList();
          console.log("일정이 성공적으로 삭제되었습니다.");
        },
        onError: (error) => {
          console.log("삭제 오류 : ", error);
          alert("삭제 중 오류가 발생했습니다:");
        },
      });
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 공통 일정 변경
  const handleChangeCommonSchedule = () => {
    if (selectedSchedule?.scheduleNo) {
      changeCommonSchedule(selectedSchedule.scheduleNo, {
        onSuccess: () => {
          closeModal();
          refetchCommonScheduleList();
          refetchMyScheduleList();
          refetchPartnerScheduleList();
          console.log("공통일정으로 변경되었습니다.");
        },
        onError: (error) => {
          console.log("변경 오류 : ", error);
          alert("공통일정 변경 중 오류가 발생했습니다:");
        },
      });
    }
  };

  const openChangeCommonScheduleModal = () => {
    setIsChangeCommonModalOpen(true);
  };

  // 일정 추가 페이지
  const openAddSchedule = () => {
    navigate(`/calendar/${date}/add`);
    closeModal();
  };

  // 공통일정 추가 페이지
  const openAddCoupleSchedule = () => {
    navigate(`/calendar/${date}/add/couple`);
    closeModal();
  };

  // 이모지 모달
  const handleEmojiModalOpen = () => {
    setIsEmojiModalOpen(true);
  };

  // 이모지 선택
  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    setIsEmojiModalOpen(false);
  };

  // 일정 수정 페이지
  const handleEditSchedule = (schedule: ScheduleData) => {
    navigate(`/edit-schedule/${schedule.scheduleNo}`, {
      state: { schedule, isCoupleSchedule: schedule.isCommon },
    });
  };

  // 일정 수정 요청 페이지
  const handleEditRequest = (schedule: ScheduleData) => {
    navigate(`/modify-schedule/${schedule.scheduleNo}`, {
      state: {
        schedule: schedule,
        isCoupleSchedule: schedule.isCommon,
      },
    });
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
            {commonScheduleList?.map((schedule) => (
              <CommonScheduleItem
                key={schedule.scheduleNo}
                top={timeToPosition(schedule.scheduleStartAt)}
                height={
                  timeToPosition(schedule.scheduleEndAt) -
                  timeToPosition(schedule.scheduleStartAt)
                }
                backgroundcolor={getBusyBackgroundColor(schedule.busyLevel)}
                $isCommon
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSchedule(schedule);
                  openModal("schedule");
                }}
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

      {/* 모달  */}
      <TimeTableModals
        activeModal={activeModal}
        selectedSchedule={selectedSchedule}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        openDeleteModal={openDeleteModal}
        openChangeCommonScheduleModal={openChangeCommonScheduleModal}
        isChangeCommonModalOpen={isChangeCommonModalOpen}
        setIsCommonModalOpen={setIsChangeCommonModalOpen}
        isEmojiModalOpen={isEmojiModalOpen}
        onClose={closeModal}
        onDeleteSchedule={handleDeleteSchedule}
        onConfirmCommonSchedule={handleChangeCommonSchedule}
        onSelectEmoji={handleSelectEmoji}
        handleEditSchedule={handleEditSchedule}
        handleEditRequest={handleEditRequest}
        handleEmojiModalOpen={handleEmojiModalOpen}
        openAddSchedule={openAddSchedule}
        openAddCoupleSchedule={openAddCoupleSchedule}
        myScheduleList={myScheduleList || []}
        partnerScheduleList={partnerScheduleList || []}
        commonScheduleList={commonScheduleList || []}
      />
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
  height: ${({ height }) => Math.max(height, 13)}px;
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
  max-width: calc(100% - 12px);
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
