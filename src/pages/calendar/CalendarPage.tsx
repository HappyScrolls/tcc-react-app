import React, { Suspense, useState } from "react";
import { Container } from "../../components/layout/Layout";
import ViewChangeHeader from "./components/ViewChangeHeader";
import { useParams } from "react-router-dom";
import ListView from "./components/ListView";
import TimeTable from "./components/TimeTableView";
import { styled } from "styled-components";

const CalendarPage = () => {
  const { date } = useParams<{ date: string }>();
  const [currentDate, setCurrentDate] = useState(new Date(date ?? new Date()));

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const formattedDate = currentDate.toISOString().split("T")[0];

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
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
          formattedDate={formattedDate}
        />
        <Suspense fallback={<div>Loading...</div>}>
          {isTimetableView ? (
            <TimeTable date={formattedDate} />
          ) : (
            <ListView date={formattedDate} />
          )}
        </Suspense>
      </CalendarContainer>
    </>
  );
};

export default CalendarPage;

const CalendarContainer = styled(Container)``;
