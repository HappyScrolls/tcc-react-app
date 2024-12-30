import { useMutation, useQuery } from "@tanstack/react-query";
import {
  modifySchedule,
  modifyScheduleRequest,
  fetchScheduleModifyRequest,
  acceptScheduleModifyRequest,
  fetchScheduleByScheduleNo,
  rejectScheduleModifyRequest,
} from "../api/schedule/scheduleAPI";
import { AxiosError } from "axios";
import { ModifyScheduleRequest, ScheduleData } from "../types/ISchedule";

// 1. 일정 수정
export const useModifySchedule = () => {
  return useMutation({
    mutationFn: ({
      scheduleNo,
      formData,
    }: {
      scheduleNo: number;
      formData: ModifyScheduleRequest;
    }) => modifySchedule(scheduleNo, formData),
    onError: (error: AxiosError) => {
      handleAxiosError(error, "일정 수정 실패");
    },
  });
};

// 2. 일정 수정 요청
export const useModifyScheduleRequest = () => {
  return useMutation({
    mutationFn: (formData: ModifyScheduleRequest) =>
      modifyScheduleRequest(formData),
    onError: (error: AxiosError) => {
      handleAxiosError(error, "수정 요청 실패");
    },
  });
};

// 3. 수정 요청 내용 조회 (GET)
export const useFetchScheduleModifyRequest = (scheduleNo: number) => {
  return useQuery<ScheduleData | null, AxiosError>({
    queryKey: ["scheduleModifyRequest", scheduleNo],
    queryFn: () => fetchScheduleModifyRequest(scheduleNo),
    enabled: !!scheduleNo,
  });
};

// 4. 수정 요청 수락 (PUT)
export const useAcceptScheduleModifyRequest = () => {
  return useMutation({
    mutationFn: (scheduleNo: number) => acceptScheduleModifyRequest(scheduleNo),
    onSuccess: () => {
      alert("수정 요청이 수락되었습니다 !");
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "수정 요청 수락 실패");
    },
  });
};

// 5. 수정 요청 거절 (PUT)
export const useRejectScheduleModifyRequest = () => {
  return useMutation({
    mutationFn: (scheduleNo: number) => rejectScheduleModifyRequest(scheduleNo),
    onSuccess: () => {
      alert("수정 요청이 거절되었습니다 ㅜㅜ");
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "수정 요청 수락 실패");
    },
  });
};

// 6. 일정 번호로 일정 조회
export const useFetchScheduleByScheduleNo = (scheduleNo: number) => {
  return useQuery<ScheduleData, AxiosError>({
    queryKey: ["scheduleDetail", scheduleNo],
    queryFn: () => fetchScheduleByScheduleNo(scheduleNo),
    enabled: !!scheduleNo,
  });
};

const handleAxiosError = (error: AxiosError, defaultMessage: string) => {
  if (error.response) {
    console.error("서버 에러:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("요청 실패:", error.request);
  } else {
    console.error("에러 메시지:", error.message);
  }
};
