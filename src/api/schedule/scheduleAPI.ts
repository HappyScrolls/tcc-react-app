import axios from "axios";
import { ModifyScheduleRequest, ScheduleData } from "../../types/ISchedule";
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
    console.log(response.data);
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
    console.log("공통일정 : ", response.data);
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

// 공통 일정으로 변경
export const changeCommonSchedule = async (scheduleNo: number) => {
  try {
    const response = await scheduleAxiosInstance.put(
      `/schedule/${scheduleNo}/common-schedule`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("공통일정으로 변경 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw new Error(`공통일정으로 변경 업데이트 실패: ${error}`);
  }
};

// 일정 수정
export const modifySchedule = async (
  scheduleNo: number,
  formData: ModifyScheduleRequest
) => {
  try {
    console.log(formData);
    const response = await scheduleAxiosInstance.put(
      `/schedule/${scheduleNo}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("일정 수정 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw new Error(`일정 수정 실패 : ${error}`);
  }
};

// 일정 수정 요청(post - 요청 보내기)
export const modifyScheduleRequest = async (
  formData: ModifyScheduleRequest
) => {
  try {
    console.log(formData);
    const response = await scheduleAxiosInstance.post(
      `/schedule/modify-request`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("일정 수정 요청 중 오류 발생:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.warn(`에러 상태 코드: ${error.response.status}`);
    }
    throw new Error(`일정 수정 요청 실패 : ${error}`);
  }
};

// 일정 수정 요청 (get - 수정 요청의 내용)
export const fetchScheduleModifyRequest = async (
  scheduleNo: number
): Promise<ScheduleData | null> => {
  try {
    const response = await scheduleAxiosInstance.get(
      `/schedule/modify-request/${scheduleNo}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

// 일정 수정 요청 (put - 수정 요청 수락)
export const acceptScheduleModifyRequest = async (
  scheduleNo: number
): Promise<ScheduleData | null> => {
  try {
    const response = await scheduleAxiosInstance.put(
      `/schedule/modify-request/${scheduleNo}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

// 일정 수정 거절 (put - 수정 요청 수락)
export const rejectScheduleModifyRequest = async (
  scheduleNo: number
): Promise<ScheduleData | null> => {
  try {
    const response = await scheduleAxiosInstance.put(
      `/schedule/modify-request/${scheduleNo}/reject`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

// 일정 번호로 일정 조회
export const fetchScheduleByScheduleNo = async (
  scheduleNo: number
): Promise<ScheduleData> => {
  try {
    const response = await scheduleAxiosInstance.get(
      `/schedule/detail/${scheduleNo}`
    );
    return response.data;
  } catch (error) {
    console.error("일정번호로 일정 조회 중 오류 발생:", error);
    if (axios.isAxiosError(error)) {
      console.warn("일정을 가져올 수 없습니다.");
    }
    throw error;
  }
};
