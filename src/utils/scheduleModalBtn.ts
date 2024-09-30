import { ScheduleData } from "../types/ISchedule";

export const scheduleModalButtons = (
  schedule: ScheduleData | null,
  options: {
    isMySchedule: boolean;
    isPartnerSchedule: boolean;
    isCommonSchedule: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onCommon?: () => void;
    onEmoji?: () => void;
    onEditRequest?: () => void;
  }
) => {
  const {
    isMySchedule,
    isPartnerSchedule,
    isCommonSchedule,
    onDelete = () => {},
    onEdit = () => {},
    onCommon = () => {},
    onEmoji = () => {},
    onEditRequest = () => {},
  } = options;

  const buttons = [];

  // 내 일정: 일정 삭제, 일정 수정, 공통 일정 변경
  if (isMySchedule) {
    buttons.push(
      {
        label: "일정 삭제",
        onClick: onDelete,
        type: "delete",
      },
      {
        label: "일정 수정",
        onClick: onEdit,
        type: "edit",
      }
    );

    if (onCommon) {
      buttons.push({
        label: "공통 일정으로 변경",
        onClick: onCommon,
        type: "common",
      });
    }
  }

  // 애인 일정: 일정 수정 요청, 이모지 남기기, 공통 일정 변경
  if (isPartnerSchedule) {
    buttons.push({
      label: "일정 수정 요청",
      onClick: onEditRequest,
      type: "editRequest",
    });

    if (onEmoji) {
      buttons.push({
        label: "이모지 남기기",
        onClick: onEmoji,
        type: "emoji",
      });
    }

    if (onCommon) {
      buttons.push({
        label: "공통 일정으로 변경",
        onClick: onCommon,
        type: "common",
      });
    }
  }

  // 공통 일정: 일정 삭제, 일정 수정, 이모지 남기기
  if (isCommonSchedule) {
    buttons.push(
      {
        label: "일정 삭제",
        onClick: onDelete,
        type: "delete",
      },
      {
        label: "일정 수정",
        onClick: onEdit,
        type: "edit",
      }
    );

    if (onEmoji) {
      buttons.push({
        label: "이모지 남기기",
        onClick: onEmoji,
        type: "emoji",
      });
    }
  }

  return buttons;
};
