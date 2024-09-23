export const getBusyBackgroundColor = (level: string): string => {
  switch (level) {
    case "여유":
      return "rgba(211, 237, 233, 0.50)";
    case "보통":
      return "rgba(255, 227, 192, 0.50)";
    case "바쁨":
      return "rgba(255, 207, 199, 0.50)";
    default:
      return "#fff";
  }
};

export const getBusyColor = (level: string): string => {
  switch (level) {
    case "여유":
      return "#51C7B4";
    case "보통":
      return "#FBBB6A";
    case "바쁨":
      return "#F14040";
    default:
      return "#fff";
  }
};
