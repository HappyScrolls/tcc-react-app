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
    throw error;
  }
};

// 일정 조회
export const fetchSchedulesByDate = async (date: string) => {
  try {
    const response = await scheduleAxiosInstance.get(`/schedule?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("일정 조회 중 오류 발생:", error);
    throw error;
  }
};
