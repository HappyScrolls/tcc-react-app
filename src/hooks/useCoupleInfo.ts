import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { LoverInfo } from "../types/ILoverInfo";
import {
  fetchCoupleInfo,
  fetchInviteCode,
  fetchLoverInfo,
  registerInviteCode,
  updateCoupleInfo,
} from "../api/couple/coupleInfo";
import { CoupleInfo } from "../types/ICoupleInfo";

// 내 애인 조회
export const useFetchMyLoverInfo = () => {
  const loverInfo = useSuspenseQuery<LoverInfo | null>({
    queryKey: ["myLoverInfo"],
    queryFn: () => fetchLoverInfo(),
  });

  return loverInfo;
};

// 커플 정보 조회
export const useFetchCoupleInfo = () => {
  const coupleInfo = useSuspenseQuery<CoupleInfo | null>({
    queryKey: ["coupleInfo"],
    queryFn: () => fetchCoupleInfo(),
  });

  return coupleInfo;
};

// 커플 정보 수정
export const useUpdateCoupleInfo = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["update-couple-info"],
    mutationFn: updateCoupleInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coupleInfo"],
      });
    },
    onError: (error) => {
      console.error("커플 정보 수정 에러.", error);
    },
  });

  return {
    mutate,
  };
};

// 커플 초대코드 생성
export const useFetchInviteCode = () => {
  const inviteCode = useSuspenseQuery<string | null>({
    queryKey: ["inviteCode"],
    queryFn: () => fetchInviteCode(),
  });

  return inviteCode;
};

// 커플 초대코드 등록
export const useRegisterInviteCode = () => {
  const { mutate } = useMutation({
    mutationKey: ["invite-code"],
    mutationFn: (inviteCode: string) => registerInviteCode(inviteCode),
    onSuccess: () => {
      console.log("성공");
    },
    onError: (error) => {
      console.error("커플 초대코드 입력 에러.", error);
    },
  });

  return { mutate };
};
