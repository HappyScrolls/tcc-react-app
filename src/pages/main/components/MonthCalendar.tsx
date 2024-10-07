import React, { useState } from "react";
import styled from "styled-components";
import {
  calculateDaysTogether,
  createCalendarDates,
  formatTodayHypen,
} from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import { ScheduleData } from "../../../types/ISchedule";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import { LoverInfo } from "../../../types/ILoverInfo";
import { IMemberInfo } from "../../../types/IMemberInfo";

import heart from "../../../images/main/heart.svg";
import pinkCake from "../../../images/main/pinkCake.svg";
import redCake from "../../../images/main/redCake.svg";
import pinkCircle from "../../../images/main/pinkCircle.svg";
import redCircle from "../../../images/main/redCircle.svg";
import commonLine from "../../../images/main/commonLine.svg";

const MonthCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formattedDate = formatTodayHypen();

  // 내 일정
  const myScheduleList = queryClient.getQueryData<ScheduleData[]>([
    "myScheduleList",
    formattedDate,
  ]);

  // 애인 일정
  const partnerScheduleList = queryClient.getQueryData<ScheduleData[]>([
    "partnerScheduleList",
    formattedDate,
  ]);

  // 내 정보
  const myInfo = queryClient.getQueryData<IMemberInfo>(["memberInfo"]);

  // 애인 정보
  const loverInfo = queryClient.getQueryData<LoverInfo>(["myLoverInfo"]);

  // 커플 정보
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  // 기념일 계산
  const isAnniversary = (day: number) => {
    if (!coupleInfo) return false;

    const startDate = new Date(coupleInfo.startedAt);
    const today = new Date(currentYear, currentMonth, day);

    const daysTogether = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      (daysTogether % 100 === 0 && daysTogether !== 0) ||
      (daysTogether % 365 === 0 && daysTogether !== 0) //
    );
  };

  // 날짜 이동
  const handleDateClick = (year: number, month: number, day: number) => {
    const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    navigate(`/calendar/${selectedDate}`);
  };

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
  const datesArray = createCalendarDates(currentYear, currentMonth);

  const isMyBirthday = (day: number) =>
    myInfo &&
    new Date(myInfo.birthDate || "").getMonth() === currentMonth &&
    new Date(myInfo.birthDate || "").getDate() === day;

  const isLoverBirthday = (day: number) =>
    loverInfo &&
    new Date(loverInfo.birthDate || "").getMonth() === currentMonth &&
    new Date(loverInfo.birthDate || "").getDate() === day;

  const hasMySchedule = (day: number) =>
    myScheduleList?.some((s) => {
      const scheduleDate = new Date(s.scheduleStartAt);
      return (
        scheduleDate.getFullYear() === currentYear &&
        scheduleDate.getMonth() === currentMonth &&
        scheduleDate.getDate() === day
      );
    });

  const hasPartnerSchedule = (day: number) =>
    partnerScheduleList?.some((s) => {
      const scheduleDate = new Date(s.scheduleStartAt);
      return (
        scheduleDate.getFullYear() === currentYear &&
        scheduleDate.getMonth() === currentMonth &&
        scheduleDate.getDate() === day
      );
    });

  const hasCommonSchedule = (day: number) =>
    myScheduleList?.some((s) => {
      const scheduleDate = new Date(s.scheduleStartAt);
      return (
        s.isCommon &&
        scheduleDate.getFullYear() === currentYear &&
        scheduleDate.getMonth() === currentMonth &&
        scheduleDate.getDate() === day
      );
    });

  const iconConditions = [
    {
      condition: isAnniversary,
      icon: { src: heart, alt: "기념일", position: "anniversary" },
    },
    {
      condition: isMyBirthday,
      icon: { src: pinkCake, alt: "내 생일", position: "birthday" },
    },
    {
      condition: isLoverBirthday,
      icon: { src: redCake, alt: "애인 생일", position: "birthday" },
    },
    {
      condition: hasMySchedule,
      icon: { src: pinkCircle, alt: "내 일정", position: "mySchedule" },
    },
    {
      condition: hasPartnerSchedule,
      icon: { src: redCircle, alt: "애인 일정", position: "partnerSchedule" },
    },
    {
      condition: hasCommonSchedule,
      icon: { src: commonLine, alt: "공통 일정", position: "commonSchedule" },
    },
  ];

  const getEventIcons = (day: number) => {
    return iconConditions
      .filter(({ condition }) => condition(day))
      .map(({ icon }) => icon);
  };

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
          <DateBox
            key={index}
            $isCurrentMonth={date.isCurrentMonth}
            $isToday={date.isToday}
            onClick={() => handleDateClick(currentYear, currentMonth, date.day)}
          >
            {date.day}
            {getEventIcons(date.day)?.map((icon, idx) => (
              <Icon
                key={idx}
                src={icon.src}
                alt={icon.alt}
                position={icon.position}
              />
            ))}
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

const DateBox = styled.div<{ $isToday: boolean; $isCurrentMonth: boolean }>`
  position: relative;
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

  color: ${(props) =>
    props.$isToday ? "#FFFFFF" : props.$isCurrentMonth ? "#3b3634" : "#9B9B9B"};
  font-family: SUIT;
  font-size: 10px;
  font-weight: 700;

  background-color: ${(props) => (props.$isToday ? "#F25454" : "#fff")};
`;

const ArrowWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img<{ position: string }>`
  position: absolute;
  ${({ position }) => positionStyles(position)};

  width: ${({ position }) =>
    position === "mySchedule" || position === "partnerSchedule"
      ? "8px"
      : "15px"};
  height: ${({ position }) =>
    position === "mySchedule" || position === "partnerSchedule"
      ? "8px"
      : "15px"};
`;

const positionStyles = (position: string) => {
  switch (position) {
    case "mySchedule":
      return `
        bottom: 14px;
        left: 33%;
        transform: translateX(-50%);
      `;
    case "partnerSchedule":
      return `
        bottom: 3px;
        left: 33%;
        transform: translateX(-50%);
      `;
    case "birthday":
      return `
        top: 20px;
        right: 4px;
      `;
    case "anniversary":
      return `
        bottom: 4px;
        right: 4px;
      `;
    case "commonSchedule":
      return `
          right: 4px;
        `;
    default:
      return "";
  }
};
