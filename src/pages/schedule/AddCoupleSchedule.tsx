import React, { Suspense } from "react";
import ScheduleForm from "./components/ScheduleForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSaveSchedule } from "../../hooks/useSaveSchedule";
import { ScheduleData } from "../../types/ISchedule";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";
import { useToastStore } from "../../store/toastStore";

const AddCoupleSchedule = () => {
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
        navigate(`/calendar/${date}`);
        showToast("success", "공통 일정을 저장하였습니다.");
      },
      onError: (error: any) => {
        console.error("저장 실패:", error);
        showToast("error", "공통 일정 저장을 실패하였습니다");
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
        <ScheduleForm onSave={handleSaveSchedule} isCoupleSchedule={true} />
      </Suspense>
    </>
  );
};

export default AddCoupleSchedule;
