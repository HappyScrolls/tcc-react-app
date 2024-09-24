import React from "react";
import ScheduleList from "./components/\bScheduleList";
import MonthCalendar from "./components/MonthCalendar";
import { Container } from "../../components/layout/Layout";
import styled from "styled-components";

const MainPage = () => {
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
