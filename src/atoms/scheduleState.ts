import { atom } from "recoil";
import { ScheduleData } from "../types/ISchedule";

export const myScheduleState = atom<ScheduleData[]>({
  key: "myScheduleState",
  default: [],
});
