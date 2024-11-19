import { useMutation } from "@tanstack/react-query";
import { modifySchedule } from "../api/schedule/scheduleAPI";
import { AxiosError } from "axios";
import { ScheduleData } from "../types/ISchedule";

export const useModifySchedule = () => {
  return useMutation({
    mutationFn: ({
      scheduleNo,
      formData,
    }: {
      scheduleNo: number;
      formData: ScheduleData;
    }) => modifySchedule(scheduleNo, formData),
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
