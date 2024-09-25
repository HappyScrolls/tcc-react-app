import { useState, useEffect } from "react";
import getMemberInfo, { fetchUserInfo } from "../api/query/get/getMemberInfo";
import { IMemberInfo } from "../types/IMemberInfo";
import { useSuspenseQuery } from "@tanstack/react-query";

// 내 정보 조회
export const useMemberInfoQuery = () => {
  const userInfo = useSuspenseQuery<IMemberInfo>({
    queryKey: ["memberInfo"],
    queryFn: () => fetchUserInfo(),

    staleTime: 60000,
  });

  return userInfo;
};

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
