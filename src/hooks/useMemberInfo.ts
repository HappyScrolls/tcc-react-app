import { fetchUserInfo } from "../api/query/get/getMemberInfo";
import { IMemberInfo } from "../types/IMemberInfo";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createUserInfo, updateUserInfo } from "../api/user/UserAPI";

// 내 정보 조회
export const useMemberInfoQuery = () => {
  const userInfo = useSuspenseQuery<IMemberInfo>({
    queryKey: ["memberInfo"],
    queryFn: () => fetchUserInfo(),

    staleTime: 60000,
  });

  return userInfo;
};

// 내 정보 등록 (추가 정보 등록)
export const useCreateMemberInfo = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ["create-member-info"],
    mutationFn: createUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["memberInfo"],
      });
      console.log("추가 정보 등록 성공");
    },
    onError: (error) => {
      console.error("추가 정보 등록 실패:", error);
    },
  });

  return { mutate, isError, isSuccess };
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
