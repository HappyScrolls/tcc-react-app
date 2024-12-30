import React, { Suspense } from "react";
import ScheduleForm from "./components/ScheduleForm";

import { ScheduleData } from "../../types/ISchedule";
import { useSaveSchedule } from "../../hooks/useSaveSchedule";
import { useNavigate, useParams } from "react-router-dom";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";
import { useToastStore } from "../../store/toastStore";

const AddMySchedulePage = () => {
  const queryClient = useQueryClient();
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);
  const showToast = useToastStore((state) => state.showToast);

  const { mutate: saveSchedule } = useSaveSchedule();

  const handleSaveSchedule = (formData: ScheduleData) => {
    console.log("서버에 전송하려는 데이터 :", formData);
    saveSchedule(formData, {
      onSuccess: () => {
        navigate(`/calendar/${date}`, { state: { refetch: true } });
        showToast("success", "일정이 등록되었습니다.");
      },
      onError: (error: any) => {
        const statusCode = error.response.status;

        showToast(
          "error",
          statusCode === 400
            ? "이미 일정이 등록된 시간입니다."
            : "일정 등록을 실패했습니다."
        );
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
