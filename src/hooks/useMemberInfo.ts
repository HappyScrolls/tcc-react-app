import { useState, useEffect } from "react";
import getMemberInfo from "../api/query/get/getMemberInfo";
import { IMemberInfo } from "../types/IMemberInfo";

export const useMemberInfo = (memberCode: string) => {
  const [userInfo, setUserInfo] = useState<IMemberInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const data = await getMemberInfo({ memberCode });
        setUserInfo(data || null);
      } catch (error) {
        console.error("Error fetching member info:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberInfo();
  }, [memberCode]);

  return { userInfo, loading };
};
