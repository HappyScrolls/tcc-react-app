// 사귄 총 날짜
export const calculateDaysTogether = (startedAt: string): number => {
  const today = new Date();
  const startDate = new Date(startedAt);

  const timeDiff = today.getTime() - startDate.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
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
