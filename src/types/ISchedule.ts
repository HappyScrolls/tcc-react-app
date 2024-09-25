export type ScheduleData = {
  scheduleNo?: number;
  busyLevel: BusyLevel;
  scheduleName: string;
  scheduleLocation: string;
  scheduleWith: string;
  groupGenderType: "혼성" | "남성" | "여성";
  scheduleStartAt: string;
  scheduleEndAt: string;
  scheduleAt: string;
  isCommon: boolean;
  status: "완료" | "미완료";
};

export type BusyLevel = "여유" | "보통" | "바쁨";
