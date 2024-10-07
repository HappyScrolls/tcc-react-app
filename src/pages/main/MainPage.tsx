/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from "react";
import ScheduleList from "./components/ScheduleList";
import MonthCalendar from "./components/MonthCalendar";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";
import { useMemberInfoQuery } from "../../hooks/useMemberInfo";
import {
  useFetchCoupleInfo,
  useFetchMyLoverInfo,
} from "../../hooks/useCoupleInfo";
import { formatTodayHypen } from "../../utils/date";
import {
  useFetchMyScheduleList,
  useFetchPartnerScheduleList,
} from "../../hooks/useScheduleList";

const MainPage = () => {
  const todayDate = formatTodayHypen();

  // 내 정보
  const { data: memberInfo } = useMemberInfoQuery();
  // 애인 정보
  const { data: myLoverInfo } = useFetchMyLoverInfo();
  // 커플 정보
  const { data: coupleInfo } = useFetchCoupleInfo();
  // 내 일정
  const { data: myScheduleList } = useFetchMyScheduleList(todayDate);
  // 애인 일정
  const { data: partnerScheduleList } = useFetchPartnerScheduleList(todayDate);
  // 공통 일정

  return (
    <>
      <MonthContainer>
        <ScheduleList />
        <MonthCalendar />
      </MonthContainer>
    </>
  );
};

export default MainPage;

const MonthContainer = styled(Container)`
  gap: 21px;
`;
