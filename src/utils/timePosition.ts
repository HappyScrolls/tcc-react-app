export const timeToPosition = (dateTime: string): number => {
  if (!dateTime || !dateTime.includes("T")) return 0;

  const [hour, minute] = dateTime.split("T")[1]?.split(":").map(Number) || [];
  if (isNaN(hour) || isNaN(minute)) return 0;

  return ((hour * 60 + minute) / 60) * 26;
};
