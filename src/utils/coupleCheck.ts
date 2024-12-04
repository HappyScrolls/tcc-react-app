import { CoupleInfo } from "../types/ICoupleInfo";

export const isValidCoupleInfo = (coupleInfo: CoupleInfo | null): boolean => {
  return !!(
    coupleInfo &&
    (coupleInfo.nickNameA || coupleInfo.nickNameB || coupleInfo.startedAt)
  );
};

export const isInvalidCoupleInfo = (coupleInfo: CoupleInfo | null): boolean => {
  return !!coupleInfo && !isValidCoupleInfo(coupleInfo);
};
