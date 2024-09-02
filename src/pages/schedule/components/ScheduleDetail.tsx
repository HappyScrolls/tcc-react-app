import React from "react";
import useGetScheduleDetail from "../../../api/query/get/useGetScheduleDetail";
import * as d from "./ScheduleDetailStyle";

interface ScheduleDetailProps {
  scheduleNo: number;
}

const ScheduleDetail: React.FC<ScheduleDetailProps> = ({ scheduleNo }) => {
  const schedule = useGetScheduleDetail({ scheduleNo });

  if (!schedule) {
    return <div>No schedule found.</div>;
  }

  return (
    <d.ScheduleDetailContainer>
      <h1>{schedule.scheduleName}</h1>
      <p>위치 : {schedule.scheduleLocation}</p>
      <p>함께하는 사람: {schedule.scheduleWith}</p>
      <p>성별: {schedule.groupGenderType}</p>
      <p>시작 시간 : {new Date(schedule.scheduleStartAt).toLocaleString()}</p>
      <p>끝나는 시간 : {new Date(schedule.scheduleEndAt).toLocaleString()}</p>
      <p>스케줄 날짜 : {new Date(schedule.scheduleAt).toLocaleDateString()}</p>
    </d.ScheduleDetailContainer>
  );
};

export default ScheduleDetail;
