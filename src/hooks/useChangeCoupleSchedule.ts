import { useMutation } from "@tanstack/react-query";
import { changeCommonSchedule } from "../api/schedule/scheduleAPI";
import { AxiosError } from "axios";

export const useChangeCommonSchedule = () => {
  return useMutation({
    mutationFn: (scheduleNo: number) => changeCommonSchedule(scheduleNo),
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            "서버 에러:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("Request failed 실패:", error.request);
        } else {
          console.error("Error message 에러:", error.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    },
  });
};
