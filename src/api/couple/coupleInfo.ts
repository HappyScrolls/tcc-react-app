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
export const fetchLoverInfo = async (): Promise<LoverInfo> => {
  try {
    const response = await memberAxiosInstance.get<LoverInfo>(
      `/account-service/couple/lover`
    );
    return response.data;
  } catch (error) {
    console.error("커플 정보 가져오기 에러 :", error);
    throw error;
  }
};
