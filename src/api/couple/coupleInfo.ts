import axios from "axios";
import { CoupleInfo } from "../../types/ICoupleInfo";
import { LoverInfo } from "../../types/ILoverInfo";
import { memberAxiosInstance } from "../axios";

export interface CreateCoupleInfoRequest {
  name: string;
  nickNameA: string;
  nickNameB: string;
  startedAt: string;
  coupleImg?: string;
}

async function createCoupleInfo(request: CreateCoupleInfoRequest) {
  try {
    const response = await memberAxiosInstance.post(
      `/account-service/couple/info`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          "Member-Code": localStorage.getItem("memberCode"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching member info:", error);
    throw error;
  }
}

export default createCoupleInfo;

// 내 상대방 조회
export const fetchLoverInfo = async (): Promise<LoverInfo | null> => {
  try {
    const response = await memberAxiosInstance.get<LoverInfo>(
      `/account-service/couple/lover`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        console.warn(
          "애인 정보가 없거나 서버 오류로 데이터를 가져올 수 없습니다."
        );
        return null;
      }
    }
    throw error;
  }
};

// 커플 정보 조회
export const fetchCoupleInfo = async (): Promise<CoupleInfo | null> => {
  try {
    const response = await memberAxiosInstance.get<CoupleInfo>(
      `/account-service/couple/detail`
    );
    return response.data;
  } catch (error) {
    // AxiosError인지 확인하고 상태 코드를 확인하여 null 반환
    if (axios.isAxiosError(error) && error.response?.status === 500) {
      console.warn(
        "커플 정보가 없거나 서버 오류로 데이터를 가져올 수 없습니다."
      );
      return null; // 서버 오류인 경우 null 반환
    }
    throw error; // 다른 에러는 그대로 던짐
  }
};

// 커플 정보 수정
export const updateCoupleInfo = async (
  updatedCoupleInfo: CoupleInfo
): Promise<CoupleInfo> => {
  try {
    const response = await memberAxiosInstance.put<CoupleInfo>(
      `/account-service/couple/info`,
      updatedCoupleInfo
    );
    return response.data;
  } catch (error) {
    console.error("커플 정보 수정 에러:", error);
    throw error;
  }
};
