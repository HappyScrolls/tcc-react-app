import React, { useState } from "react";
import { Container } from "../../components/layout/Layout";
import ViewChangeHeader from "./components/ViewChangeHeader";
import { useParams } from "react-router-dom";
import ListView from "./components/ListView";
import TimeTable from "./components/TimeTableView";
import { styled } from "styled-components";

const CalendarPage = () => {
  const { date } = useParams<{ date: string }>();
  console.log(date);

  const [isTimetableView, setIsTimetableView] = useState(true);

  const toggleView = () => {
    setIsTimetableView(!isTimetableView);
  };

  return (
    <>
      <CalendarContainer>
        <ViewChangeHeader
          isTimetableView={isTimetableView}
          toggleView={toggleView}
        />
        {isTimetableView ? <TimeTable /> : <ListView />}
      </CalendarContainer>
    </>
  );
};

export default CalendarPage;

const CalendarContainer = styled(Container)`
  gap: 10px;
`;
