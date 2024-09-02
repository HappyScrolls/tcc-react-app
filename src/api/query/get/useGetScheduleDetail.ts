import { useSuspenseQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios";
import { ISchedule } from "../../../types/ISchedule";

interface useGetScheduleDetailProps {
  scheduleNo: number;
}

function useGetScheduleDetail({
  scheduleNo,
}: useGetScheduleDetailProps): ISchedule | undefined {
  // 데이터 가져오기
  const fetchSchedule = async (scheduleNo: number): Promise<ISchedule> => {
    const response = await axiosInstance.get(`/schedule/${scheduleNo}`);

    return response.data;
  };

  const { data: schedule } = useSuspenseQuery({
    queryKey: ["getScheduleDetail", scheduleNo],
    queryFn: () => fetchSchedule(scheduleNo),
  });

  return schedule;
}

export default useGetScheduleDetail;
