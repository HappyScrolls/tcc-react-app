import React from "react";

import tearEmoji from "../../../images/emoji/이모지_눈물.png";
import coupleEmoji from "../../../images/emoji/이모지_커플.png";
import { ScheduleData } from "../../../types/ISchedule";
import TwoBtnModal from "../../../components/modal/TwoBtnModal";
import ScheduleDetailModal from "./ScheduleDetailModal";
import OneBtnModal from "../../../components/modal/OneBtnModal";
import { scheduleModalButtons } from "../../../utils/scheduleModalBtn";
import AddScheduleModal from "../../../components/modal/AddScheduleModal";

type ModalType = "empty" | "schedule" | null;

interface ModalsProps {
  activeModal: ModalType;
  selectedSchedule: ScheduleData | null;
  isDeleteModalOpen: boolean;
  isChangeCommonModalOpen: boolean;
  onClose: () => void;
  onDeleteSchedule: () => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: () => void;
  openChangeCommonScheduleModal: () => void;
  onConfirmCommonSchedule: () => void;
  setIsCommonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditSchedule: (schedule: ScheduleData) => void;
  handleEditRequest: (schedule: ScheduleData) => void;
  openAddSchedule: () => void;
  openAddCoupleSchedule: () => void;
  myScheduleList: ScheduleData[];
  partnerScheduleList: ScheduleData[];
  commonScheduleList: ScheduleData[];
}
const TimeTableModals: React.FC<ModalsProps> = ({
  activeModal,
  selectedSchedule,
  isDeleteModalOpen,
  isChangeCommonModalOpen,
  onClose,
  onDeleteSchedule,
  openDeleteModal,
  openChangeCommonScheduleModal,
  onConfirmCommonSchedule,
  setIsCommonModalOpen,
  handleEditSchedule,
  handleEditRequest,
  openAddSchedule,
  openAddCoupleSchedule,
  setIsDeleteModalOpen,
  myScheduleList,
  partnerScheduleList,
  commonScheduleList,
}) => {
  return (
    <>
      {/* 일정 추가 모달 */}
      {activeModal === "empty" && (
        <AddScheduleModal
          onClose={onClose}
          openAddSchedule={openAddSchedule}
          openAddCoupleSchedule={openAddCoupleSchedule}
        />
      )}

      {/* 일정 상세 모달 */}
      {activeModal === "schedule" && selectedSchedule && (
        <ScheduleDetailModal
          schedule={selectedSchedule}
          onClose={onClose}
          buttons={scheduleModalButtons(selectedSchedule, {
            isMySchedule: myScheduleList?.includes(selectedSchedule),
            isPartnerSchedule: partnerScheduleList?.includes(selectedSchedule),
            isCommonSchedule: commonScheduleList?.includes(selectedSchedule),
            onDelete: openDeleteModal,
            onEdit: () => handleEditSchedule(selectedSchedule),
            onCommon: openChangeCommonScheduleModal,
            onEditRequest: () => handleEditRequest(selectedSchedule),
          })}
        />
      )}

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <TwoBtnModal
          title={`${selectedSchedule?.scheduleName} 일정을 삭제하시겠습니까?`}
          description="복구가 불가능합니다."
          confirmText="예"
          cancelText="아니오"
          imageSrc={tearEmoji}
          onConfirm={() => {
            onDeleteSchedule();
            setIsDeleteModalOpen(false);
          }}
          onCancel={() => {
            setIsDeleteModalOpen(false);
          }}
        />
      )}

      {/* 공통 일정 변경 모달 */}
      {isChangeCommonModalOpen && (
        <OneBtnModal
          title="공통 일정으로 변경되었습니다."
          description=""
          imageSrc={coupleEmoji}
          confirmText="확인"
          onConfirm={() => {
            onConfirmCommonSchedule();
            setIsCommonModalOpen(false);
          }}
        />
      )}

      {/* 이모지 모달 */}
      {/* {isEmojiModalOpen && (
        <EmojiModal onSelectEmoji={onSelectEmoji} onClose={onClose} />
      )} */}
    </>
  );
};

export default TimeTableModals;
