import React, { Suspense, useState } from "react";
import { Container } from "../../components/layout/Layout";
import ViewChangeHeader from "./components/ViewChangeHeader";
import { useParams } from "react-router-dom";
import ListView from "./components/ListView";
import TimeTable from "./components/TimeTableView";
import { styled } from "styled-components";

const CalendarPage = () => {
  const { date } = useParams<{ date: string }>();
  const todayDate = date ? new Date(date) : new Date();
  const [currentDate, setCurrentDate] = useState(todayDate);

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
      <Suspense fallback={<div>Loading...</div>}>
        <CalendarContainer>
          <ViewChangeHeader
            isTimetableView={isTimetableView}
            toggleView={toggleView}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            formattedDate={formattedDate}
          />

          {isTimetableView ? (
            <TimeTable date={formattedDate} />
          ) : (
            <ListView date={formattedDate} />
          )}
        </CalendarContainer>{" "}
      </Suspense>
    </>
  );
};

export default CalendarPage;

const CalendarContainer = styled(Container)``;
