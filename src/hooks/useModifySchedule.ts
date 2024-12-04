import { useMutation } from "@tanstack/react-query";
import {
  modifySchedule,
  modifyScheduleRequest,
} from "../api/schedule/scheduleAPI";
import { AxiosError } from "axios";
import { ModifyScheduleRequest } from "../types/ISchedule";

// 일정 수정
export const useModifySchedule = () => {
  return useMutation({
    mutationFn: ({
      scheduleNo,
      formData,
    }: {
      scheduleNo: number;
      formData: ModifyScheduleRequest;
    }) => modifySchedule(scheduleNo, formData),
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            "서버 에러:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("Request failed 실패:", error.request);
        } else {
          console.error("Error message 에러:", error.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    },
  });
};

// 일정 수정 요청
export const useModifyScheduleRequest = () => {
  return useMutation({
    mutationFn: (formData: ModifyScheduleRequest) =>
      modifyScheduleRequest(formData),

    onSuccess: () => {
      alert("일정 수정 요청이 성공적으로 완료되었습니다.");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            "서버 에러:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("Request failed 실패:", error.request);
        } else {
          console.error("Error message 에러:", error.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    },
  });
};
