import { useState, useEffect } from "react";
import getMemberInfo, { fetchUserInfo } from "../api/query/get/getMemberInfo";
import { IMemberInfo } from "../types/IMemberInfo";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { updateUserInfo } from "../api/user/UserAPI";

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

// 내 정보 수정
export const useUpdateMemberInfo = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["update-member-info"],
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memberInfo"],
      });
    },
    onError: (error) => {
      console.error("정보 수정 에러.", error);
    },
  });

  return {
    mutate,
  };
};
