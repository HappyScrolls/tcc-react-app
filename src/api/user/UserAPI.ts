import { IMemberInfo } from "../../types/IMemberInfo";
import { memberAxiosInstance } from "../axios";

// 내 정보 수정
export const updateUserInfo = async (
  updatedUserInfo: IMemberInfo
): Promise<IMemberInfo> => {
  try {
    const response = await memberAxiosInstance.put<IMemberInfo>(
      `/account-service/member`,
      updatedUserInfo
    );
    return response.data;
  } catch (error) {
    console.error("내 정보 수정 에러:", error);
    throw error;
  }
};
