import React, { Suspense } from "react";
import ScheduleList from "./components/ScheduleList";
import MonthCalendar from "./components/MonthCalendar";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";

const MainPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MonthContainer>
          <ScheduleList />
          <MonthCalendar />
        </MonthContainer>
      </Suspense>
    </>
  );
};

export default MainPage;

const MonthContainer = styled(Container)`
  gap: 21px;
`;
