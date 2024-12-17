import { useSuspenseQuery } from "@tanstack/react-query";

import { ScheduleData } from "../types/ISchedule";
import {
  fetchCommonScheduleList,
  fetchMyScheduleList,
  fetchPartnerScheduleList,
  fetchScheduleByScheduleNo,
} from "../api/schedule/scheduleAPI";

// 내 일정 리스트
export const useFetchMyScheduleList = (searchDate: string) => {
  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["myScheduleList", searchDate],
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

// 공통 일정 리스트
export const useFetchCommonScheduleList = (searchDate: string) => {
  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["commonScheduleList", searchDate],
    queryFn: () => fetchCommonScheduleList(searchDate),
  });

  return schedule;
};

// 일정 번호 일정 조회
export const useFetchScheduleByScheduleNo = (scheduleNo: number) => {
  const schedule = useSuspenseQuery<ScheduleData>({
    queryKey: ["scheduleByNo", scheduleNo],
    queryFn: () => fetchScheduleByScheduleNo(scheduleNo),
  });

  return schedule;
};
