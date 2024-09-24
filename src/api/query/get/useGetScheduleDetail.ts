import { useSuspenseQuery } from "@tanstack/react-query";
import { scheduleAxiosInstance } from "../../axios";
import { ScheduleData } from "../../../types/ISchedule";

interface useGetScheduleDetailProps {
  scheduleNo: number;
}

function useGetScheduleDetail({
  scheduleNo,
}: useGetScheduleDetailProps): ScheduleData | undefined {
  // 데이터 가져오기
  const fetchSchedule = async (scheduleNo: number): Promise<ScheduleData> => {
    const response = await scheduleAxiosInstance.get(`/schedule/${scheduleNo}`);

    return response.data;
  };

  const { data: schedule } = useSuspenseQuery({
    queryKey: ["getScheduleDetail", scheduleNo],
    queryFn: () => fetchSchedule(scheduleNo),
  });

  return schedule;
}

export default useGetScheduleDetail;
