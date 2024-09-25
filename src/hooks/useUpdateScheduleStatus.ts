import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheduleStatus } from "../api/schedule/scheduleAPI";

export const useUpdateScheduleStatus = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["update-schedule-status"],
    mutationFn: updateScheduleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myScheduleList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["partnerScheduleList"],
      });
    },
  });

  return {
    mutate,
  };
};
