import axios from "axios";
import { ScheduleData } from "../../types/ISchedule";
import { ApiResponse } from "../ApiResponse";
import { scheduleAxiosInstance } from "../axios";

// 일정 생성
export const createSchedule = async (
  scheduleData: ScheduleData
): Promise<ApiResponse> => {
  try {
    const response = await scheduleAxiosInstance.post<ApiResponse>(
      "/schedule",
      scheduleData
    );
    return response.data;
  } catch (error) {
    console.error("일정 생성 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw error;
  }
};

// 일정 삭제
export const deleteSchedule = async (scheduleNo: number) => {
  try {
    const response = await scheduleAxiosInstance.delete(
      `/schedule/${scheduleNo}`
    );
    return response.data;
  } catch (error) {
    console.error("일정 삭제 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw error;
  }
};

// 내 일정 리스트 조회
export const fetchMyScheduleList = async (
  searchDate: string
): Promise<ScheduleData[]> => {
  try {
    const response = await scheduleAxiosInstance.get(
      `/schedule?searchDate=${searchDate}`
    );
    return response.data;
  } catch (error) {
    console.error("내 일정 리스트 조회 중 오류 발생:", error);
    if (axios.isAxiosError(error)) {
      console.warn("내 일정 정보를 가져올 수 없습니다.");
      return [];
    }
    throw error;
  }
};

// 애인 일정 조회
export const fetchPartnerScheduleList = async (
  searchDate: string
): Promise<ScheduleData[]> => {
  try {
    const response = await scheduleAxiosInstance.get(
      `/schedule/couple?searchDate=${searchDate}`
    );
    return response.data;
  } catch (error) {
    console.error("애인 일정 조회 중 오류 발생:", error);
    if (axios.isAxiosError(error)) {
      console.warn("애인 일정 정보를 가져올 수 없습니다.");
      return [];
    }
    throw error;
  }
};

// 공통 일정 조회
export const fetchCommonScheduleList = async (
  searchDate: string
): Promise<ScheduleData[]> => {
  try {
    const response = await scheduleAxiosInstance.get(
      `/schedule/common?searchDate=${searchDate}`
    );
    return response.data;
  } catch (error) {
    console.error("공통 일정 조회 중 오류 발생:", error);
    if (axios.isAxiosError(error)) {
      console.warn("공통 일정 정보를 가져올 수 없습니다.");
      return [];
    }
    throw error;
  }
};

// 일정 상태 업데이트
export const updateScheduleStatus = async ({
  scheduleNo,
  status,
}: {
  scheduleNo: number;
  status: string;
}) => {
  try {
    const response = await scheduleAxiosInstance.put(
      `/schedule/${scheduleNo}/status`,
      {},
      {
        params: {
          status,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("일정 상태 업데이트 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw new Error(`일정 상태 업데이트 실패: ${error}`);
  }
};
