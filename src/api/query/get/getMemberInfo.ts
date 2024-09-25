import { memberAxiosInstance } from "../../axios";
import { IMemberInfo } from "../../../types/IMemberInfo";

interface useGetMemberInfoProps {
  memberCode: string;
}

async function getMemberInfo({
  memberCode,
}: useGetMemberInfoProps): Promise<IMemberInfo | undefined> {
  try {
    const response = await memberAxiosInstance.get(`/account-service/member`, {
      headers: {
        "Member-Code": memberCode, // 헤더에 memberCode 추가
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching member info:", error);
    throw error;
  }
}

export default getMemberInfo;

// 내 정보 조회 (query)

export const fetchUserInfo = async (): Promise<IMemberInfo> => {
  try {
    const response = await memberAxiosInstance.get<IMemberInfo>(
      `/account-service/member`
    );
    return response.data;
  } catch (error) {
    console.error("내 정보 가져오기 에러 :", error);
    throw error;
  }
};
