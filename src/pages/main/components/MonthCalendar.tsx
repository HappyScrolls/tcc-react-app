import React, { useState } from "react";
import styled from "styled-components";

// 마지막 날짜가 30일인지 31일인지
const getlastDay = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // 월 이동
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 달력에 날짜 넣기
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = getlastDay(currentYear, currentMonth);
  const prevLastDay = getlastDay(currentYear, currentMonth - 1);

  const datesArray = [];

  // 이전 월의 날짜
  for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
    datesArray.push({ day: prevLastDay - i + 1, isCurrentMonth: false });
  }

  // 현재 월의 날짜
  for (let i = 1; i <= lastDay; i++) {
    datesArray.push({ day: i, isCurrentMonth: true });
  }

  // 다음 달의 날짜
  const nextDays = 42 - datesArray.length;
  for (let i = 1; i <= nextDays; i++) {
    datesArray.push({ day: i, isCurrentMonth: false });
  }

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <MonthText>
          {currentYear}년 {currentMonth + 1}월
        </MonthText>
        <ArrowWrapper>
          <Arrow onClick={handlePrevMonth}>{"<"}</Arrow>
          <Arrow onClick={handleNextMonth}>{">"}</Arrow>
        </ArrowWrapper>
      </CalendarHeader>
      <DaysWrapper>
        <DayName>Mon</DayName>
        <DayName>Tue</DayName>
        <DayName>Wed</DayName>
        <DayName>Thu</DayName>
        <DayName>Fri</DayName>
        <DayName>Sat</DayName>
        <DayName>Sun</DayName>
      </DaysWrapper>
      <DatesGrid>
        {datesArray.map((date, index) => (
          <DateBox key={index} $isCurrentMonth={date.isCurrentMonth}>
            {date.day}
          </DateBox>
        ))}
      </DatesGrid>
    </CalendarWrapper>
  );
};

export default MonthCalendar;

const CalendarWrapper = styled.div`
  width: 321px;
  border-radius: 15px;
  background: var(--Secondary, #ffcfc7);
  padding: 15px;
  display: flex;
  flex-direction: column;
  padding: 17px auto 30px auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

const MonthText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 10px;
`;

const DayName = styled.div`
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 6px;
`;

const DateBox = styled.div<{ $isCurrentMonth: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 40px;
  padding: 3px 16px 24px 4px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;

  background: #fff;
  color: ${(props) => (props.$isCurrentMonth ? "#3b3634" : "#9B9B9B")};
  font-family: SUIT;
  font-size: 10px;
  font-weight: 700;
`;

const ArrowWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
