import { useSuspenseQuery } from "@tanstack/react-query";
import { LoverInfo } from "../types/ILoverInfo";
import { fetchCoupleInfo, fetchLoverInfo } from "../api/couple/coupleInfo";
import { CoupleInfo } from "../types/ICoupleInfo";

// 내 애인 조회
export const useFetchMyLoverInfo = () => {
  const loverInfo = useSuspenseQuery<LoverInfo>({
    queryKey: ["myLoverInfo"],
    queryFn: () => fetchLoverInfo(),
  });

  return loverInfo;
};

// 커플 정보 조회
export const useFetchCoupleInfo = () => {
  const coupleInfo = useSuspenseQuery<CoupleInfo>({
    queryKey: ["coupleInfo"],
    queryFn: () => fetchCoupleInfo(),
  });

  return coupleInfo;
};
