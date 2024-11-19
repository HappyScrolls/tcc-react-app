import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScheduleData } from "../../types/ISchedule";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { formatDateHyphen } from "../../utils/date";
import ModifyScheduleForm from "../../components/form/ModifyScheduleForm";

const ModifyScheduleRequestPage = () => {
  const location = useLocation();
  const {
    schedule,
    isCoupleSchedule,
  }: { schedule: ScheduleData; isCoupleSchedule: boolean } = location.state;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  const handleSave = (formData: ScheduleData) => {
    console.log("수정 d요청하려는 데이터:", formData);
    alert("수정 요청");
    // API 호출
    navigate(-1);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoupleAndDateInfoHeader
        selectedDate={formatDateHyphen(schedule.scheduleStartAt)}
        coupleInfo={coupleInfo}
      />
      <ModifyScheduleForm
        onSave={handleSave}
        initialFormData={schedule}
        isCoupleSchedule={isCoupleSchedule}
      />
    </Suspense>
  );
};

export default ModifyScheduleRequestPage;
