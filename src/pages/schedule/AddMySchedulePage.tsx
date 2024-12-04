import React, { Suspense } from "react";
import ScheduleForm from "./components/ScheduleForm";

import { ScheduleData } from "../../types/ISchedule";
import { useSaveSchedule } from "../../hooks/useSaveSchedule";
import { useNavigate, useParams } from "react-router-dom";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";

const AddMySchedulePage = () => {
  const queryClient = useQueryClient();
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  const { mutate: saveSchedule } = useSaveSchedule();

  const handleSaveSchedule = (formData: ScheduleData) => {
    console.log("서버에 전송하려는 데이터 :", formData);
    saveSchedule(formData, {
      onSuccess: () => {
        navigate(`/calendar/${date}`, { state: { refetch: true } });
      },
      onError: (error: any) => {
        console.error("저장 실패:", error);
        alert("일정 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      },
    });
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {date && (
          <CoupleAndDateInfoHeader
            selectedDate={date}
            coupleInfo={coupleInfo}
          />
        )}
        <ScheduleForm onSave={handleSaveSchedule} isCoupleSchedule={false} />
      </Suspense>
    </>
  );
};

export default AddMySchedulePage;
