export type ScheduleData = {
  scheduleNo: number;
  busyLevel: BusyLevel;
  scheduleName: string;
  scheduleLocation: string;
  scheduleWith: string;
  genderType: "혼성" | "남성" | "여성" | "";
  scheduleStartAt: string;
  scheduleEndAt: string;
  isCommon: boolean;
  status: string;
};

export type BusyLevel = "여유" | "보통" | "바쁨";

export interface ModifyScheduleRequest {
  scheduleNo: number;
  busyLevel: BusyLevel;
  scheduleName: string;
  scheduleLocation: string;
  scheduleWith: string;
  genderType: "혼성" | "남성" | "여성" | "";
  scheduleStartAt: string;
  scheduleEndAt: string;
  isCommon: boolean;
}
