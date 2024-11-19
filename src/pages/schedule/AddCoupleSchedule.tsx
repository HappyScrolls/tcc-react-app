import React, { Suspense } from "react";
import ScheduleForm from "./components/ScheduleForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSaveSchedule } from "../../hooks/useSaveSchedule";
import { ScheduleData } from "../../types/ISchedule";
import AddScheduleHeader from "./components/AddScheduleHeader";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";

const AddCoupleSchedule = () => {
  const queryClient = useQueryClient();
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  const { mutate: saveSchedule } = useSaveSchedule();

  const handleSaveSchedule = (formData: ScheduleData) => {
    console.log("서버에 전송하려는 데이터 :", formData);
    saveSchedule(formData, {
      onSuccess: () => {
        navigate(`/calendar/${date}`);
      },
    });
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {date && (
          <AddScheduleHeader selectedDate={date} coupleInfo={coupleInfo} />
        )}
        <ScheduleForm onSave={handleSaveSchedule} isCoupleSchedule={true} />
      </Suspense>
    </>
  );
};

export default AddCoupleSchedule;
