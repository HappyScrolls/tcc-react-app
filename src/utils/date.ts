import { ScheduleData } from "../types/ISchedule";

// 사귄 총 날짜
export const calculateDaysTogether = (startedAt: string): number => {
  const today = new Date();
  const startDate = new Date(startedAt);

  const timeDiff = today.getTime() - startDate.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);
};

// 날짜를 YYYY.MM.DD 형식 변환
export const formatDateDot = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/-/g, ".");
};

// 날짜를 YYYY-MM-DD 형식 변환
export const formatDateHyphen = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "-");
};

// 오늘 날짜
export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

// 해당 달의 마지막 날짜
export const getLastDay = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 오늘 날짜를 YYYY-MM-DD로 변환
export const formatTodayHypen = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 년 반환
export const getYear = (): string => {
  const today = new Date();
  return String(today.getFullYear());
};

// 월 반환
export const getMonth = (): string => {
  const today = new Date();
  return String(today.getMonth() + 1).padStart(2, "0");
};

// 일 반환
export const getDay = (): string => {
  const today = new Date();
  return String(today.getDate()).padStart(2, "0");
};

// 현재 시간의 일정
export const getCurrentSchedule = (
  schedules: ScheduleData[] | undefined
): ScheduleData | undefined => {
  if (!schedules) return undefined;
  const currentTime = new Date().getTime();
  return schedules.find((schedule) => {
    const start = new Date(schedule.scheduleStartAt).getTime();
    const end = new Date(schedule.scheduleEndAt).getTime();
    return currentTime >= start && currentTime <= end;
  });
};

export const createCalendarDates = (year: number, month: number) => {
  const today = new Date();
  const isToday = (date: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 월의 첫 날 요일
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // 현재 월의 마지막 날
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate(); // 이전 월의 마지막 날

  const datesArray = [];

  // 이전 월의 날짜 추가
  for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
    const date = lastDateOfPrevMonth - i + 1;
    datesArray.push({
      day: date,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // 현재 월의 날짜 추가
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const currentDate = new Date(year, month, i);
    datesArray.push({
      day: i,
      isCurrentMonth: true,
      isToday: isToday(currentDate),
    });
  }

  // 다음 월의 날짜 추가
  const nextDays = 42 - datesArray.length; // 총 42개(6x7)의 날짜가 필요하므로 남은 칸을 채움
  for (let i = 1; i <= nextDays; i++) {
    datesArray.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  return datesArray;
};
