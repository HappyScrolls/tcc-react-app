import React from "react";
import ScheduleForm from "./components/ScheduleForm";

import { ScheduleData } from "../../types/ISchedule";
import { useSaveSchedule } from "../../hooks/useSaveSchedule";
import { useNavigate, useParams } from "react-router-dom";

const AddMySchedulePage = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

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
      <ScheduleForm onSave={handleSaveSchedule} isCoupleSchedule={false} />
    </>
  );
};

export default AddMySchedulePage;
