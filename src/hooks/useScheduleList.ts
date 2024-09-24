import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchMyScheduleList,
  fetchPartnerScheduleList,
} from "../api/schedule/scheduleAPI";

import { ScheduleData } from "../types/ISchedule";

// 내 일정 리스트
export const useFetchMyScheduleList = (searchDate: string) => {
  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: [
      "myScheduleList",
      searchDate,
      localStorage.getItem("memberCode"),
    ],
    queryFn: () => fetchMyScheduleList(searchDate),
  });

  return schedule;
};

// 애인 일정 리스트
export const useFetchPartnerScheduleList = (searchDate: string) => {
  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["partnerScheduleList", searchDate],
    queryFn: () => fetchPartnerScheduleList(searchDate),
  });

  return schedule;
};
