import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyScheduleList } from "../api/schedule/scheduleAPI";
import { useRecoilState } from "recoil";
import { myScheduleState } from "../atoms/scheduleState";
import { ScheduleData } from "../types/ISchedule";
import { useEffect } from "react";

// 내 일정 리스트
export const useFetchMyScheduleList = (searchDate: string) => {
  const [, setMyScheduleList] = useRecoilState(myScheduleState);

  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["myScheduleList", searchDate],
    queryFn: () => fetchMyScheduleList(searchDate),
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (schedule.data) {
      setMyScheduleList(schedule.data);
    }
  }, [schedule.data, setMyScheduleList]);

  return schedule;
};
