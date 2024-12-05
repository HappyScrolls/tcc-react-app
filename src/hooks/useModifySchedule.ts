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
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            "서버 에러:",
            error.response.status,
            error.response.data
          );
          alert(
            `수정 실패: ${error.response.data.message || "알 수 없는 오류"}`
          );
        } else if (error.request) {
          console.error("요청 실패:", error.request);
          alert("수정 실패: 서버로 요청이 전달되지 않았습니다.");
        } else {
          console.error("에러 메시지:", error.message);
          alert(`수정 실패: ${error.message}`);
        }
      } else {
        console.error("알 수 없는 에러:", error);
        alert("수정 실패: 알 수 없는 에러가 발생했습니다.");
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
