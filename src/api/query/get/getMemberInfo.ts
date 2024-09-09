import {axiosInstance, memberAxiosInstance} from "../../axios";
import { ISchedule } from "../../../types/ISchedule";
import {IMemberInfo} from "../../../types/IMemberInfo";

interface useGetMemberInfoProps {
    memberCode: string;
}

async function getMemberInfo({memberCode}: useGetMemberInfoProps): Promise<IMemberInfo | undefined> {

    try {
        const response = await memberAxiosInstance.get(`/member`, {
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
