import { useSuspenseQuery } from "@tanstack/react-query";
import { LoverInfo } from "../types/ILoverInfo";
import { fetchLoverInfo } from "../api/couple/coupleInfo";

// 내 애인 조회
export const useFetchMyLoverInfo = () => {
  const loverInfo = useSuspenseQuery<LoverInfo>({
    queryKey: ["myLoverInfo"],
    queryFn: () => fetchLoverInfo(),
  });

  return loverInfo;
};
