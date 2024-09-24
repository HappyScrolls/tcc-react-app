import React from "react";
import ScheduleForm from "./components/ScheduleForm";
import { createSchedule } from "../../api/schedule/scheduleAPI";
import { AxiosError } from "axios";
import { ScheduleData } from "../../types/ISchedule";

const AddMySchedulePage = () => {
  const handleSaveSchedule = async (formData: ScheduleData) => {
    try {
      console.log("서버에 전송하려는 데이터 :", formData);
      await createSchedule(formData);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            "서버 에러 :",
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
    }
  };

  return (
    <>
      <ScheduleForm onSave={handleSaveSchedule} isCoupleSchedule={false} />
    </>
  );
};

export default AddMySchedulePage;
