import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchMyScheduleList,
  fetchPartnerScheduleList,
} from "../api/schedule/scheduleAPI";
import { useRecoilState } from "recoil";
import { myScheduleState } from "../atoms/scheduleState";
import { ScheduleData } from "../types/ISchedule";
import { useEffect, useState } from "react";

// 내 일정 리스트
export const useFetchMyScheduleList = (searchDate: string) => {
  const [myScheduleList, setMyScheduleList] = useRecoilState(myScheduleState);
  const [memberCode, setMemberCode] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberCode = localStorage.getItem("memberCode");
    setMemberCode(storedMemberCode);
  }, []);

  console.log(memberCode);
  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["myScheduleList", searchDate, memberCode],
    queryFn: () => fetchMyScheduleList(searchDate),
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (schedule.data) {
      setMyScheduleList(schedule.data);
    }
  }, [schedule.data, myScheduleList, setMyScheduleList]);

  return schedule;
};

// 애인 일정 리스트
export const useFetchPartnerScheduleList = (searchDate: string) => {
  const [partnerScheduleList, setPartnerScheduleList] =
    useRecoilState(myScheduleState);

  const schedule = useSuspenseQuery<ScheduleData[]>({
    queryKey: ["partnerScheduleList", searchDate],
    queryFn: () => fetchPartnerScheduleList(searchDate),
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (schedule.data) {
      setPartnerScheduleList(schedule.data);
    }
  }, [schedule.data, partnerScheduleList, setPartnerScheduleList]);

  return schedule;
};
