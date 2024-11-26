import { IAdditionalMembberInfo, IMemberInfo } from "../../types/IMemberInfo";
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

// 회원가입 추가 정보 입력
export const createUserInfo = async (
  createUserInfo: IAdditionalMembberInfo
): Promise<void> => {
  try {
    await memberAxiosInstance.post(
      `/account-service/member/additional-info`,
      createUserInfo
    );
  } catch (error: any) {
    console.error(
      "추가 정보 입력 에러:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
