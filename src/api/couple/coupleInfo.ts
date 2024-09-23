import { memberAxiosInstance} from "../axios";

export interface CreateCoupleInfoRequest {
    name: string,
    nickNameA: string,
    nickNameB: string,
    startedAt: string,
    coupleImg?: string,
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
                }
            }
        );
    } catch (error) {
        console.error("Error fetching member info:", error);
        throw error;
    }
}

export default createCoupleInfo;
