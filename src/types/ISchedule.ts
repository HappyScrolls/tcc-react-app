export type ScheduleData = {
  busyLevel: BusyLevel;
  scheduleName: string;
  scheduleLocation: string;
  scheduleWith: string;
  groupGenderType: "혼성" | "남성" | "여성";
  scheduleStartAt: string;
  scheduleEndAt: string;
  scheduleAt: string;
  isCommon: boolean;
};

export type BusyLevel = "여유" | "보통" | "바쁨";
