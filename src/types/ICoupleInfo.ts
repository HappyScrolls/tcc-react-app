// 커플 정보
export interface CoupleInfo {
  no: number;
  accountNoA: number;
  accountNoB: number;
  nickNameA: string | null;
  nickNameB: string | null;
  name: string | null;
  startedAt: string;
  coupleImg: string | null;
}
