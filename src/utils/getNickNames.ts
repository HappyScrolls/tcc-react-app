import { CoupleInfo } from "../types/ICoupleInfo";

export const getNickNames = (
  coupleInfo: CoupleInfo | null,
  myAccountNo: number,
  loverAccountNo: number
): { myNickName: string | null; loverNickName: string | null } => {
  if (!coupleInfo) {
    return { myNickName: null, loverNickName: null };
  }

  const myNickName =
    coupleInfo.accountNoA === myAccountNo
      ? coupleInfo.nickNameA
      : coupleInfo.accountNoB === myAccountNo
      ? coupleInfo.nickNameB
      : null;

  const loverNickName =
    coupleInfo.accountNoA === loverAccountNo
      ? coupleInfo.nickNameA
      : coupleInfo.accountNoB === loverAccountNo
      ? coupleInfo.nickNameB
      : null;

  return { myNickName, loverNickName };
};
