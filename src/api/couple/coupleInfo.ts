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
      console.warn("내 상대방 정보가 없습니다.");
      return null;
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
    if (axios.isAxiosError(error)) {
      console.warn(
        "커플 정보가 없거나 서버 오류로 데이터를 가져올 수 없습니다."
      );
      return null;
    }
    throw error;
  }
};

// 커플 정보 등록 + 수정
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

// 커플 초대코드 생성
export const fetchInviteCode = async (): Promise<string | null> => {
  try {
    const response = await memberAxiosInstance.post<string>(
      `/account-service/couple/invite-code`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn("초대코드 없음.");
      return null;
    }
    throw error;
  }
};

// 커플 초대코드 등록
export const registerInviteCode = async (inviteCode: string): Promise<void> => {
  try {
    await memberAxiosInstance.post(`/account-service/couple`, { inviteCode });
  } catch (error) {
    console.error("초대코드 등록 에러:", error);
    throw error;
  }
};
