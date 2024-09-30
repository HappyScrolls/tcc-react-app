import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../api/schedule/scheduleAPI";

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: deleteSchedule,
    onError: (error: unknown) => {
      console.log(error);
    },
  });
};
