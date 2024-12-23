import { useMutation, useQuery } from "@tanstack/react-query";
import {
  modifySchedule,
  modifyScheduleRequest,
  fetchScheduleModifyRequest,
  acceptScheduleModifyRequest,
  fetchScheduleByScheduleNo,
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
    onSuccess: () => {
      alert("일정 수정 요청이 성공적으로 완료되었습니다.");
    },
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
      alert("수정 요청이 수락되었습니다.");
    },
    onError: (error: AxiosError) => {
      handleAxiosError(error, "수정 요청 수락 실패");
    },
  });
};

// 5. 일정 번호로 일정 조회
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
    alert(`${defaultMessage}: ${error.response.data || "알 수 없는 오류"}`);
  } else if (error.request) {
    console.error("요청 실패:", error.request);
    alert(`${defaultMessage}: 서버로 요청이 전달되지 않았습니다.`);
  } else {
    console.error("에러 메시지:", error.message);
    alert(`${defaultMessage}: ${error.message}`);
  }
};
