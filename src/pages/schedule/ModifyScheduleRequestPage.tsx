import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModifyScheduleRequest, ScheduleData } from "../../types/ISchedule";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { formatDateHyphen } from "../../utils/date";
import ModifyScheduleForm from "../../components/form/ModifyScheduleForm";
import { useModifyScheduleRequest } from "../../hooks/useModifySchedule";

const ModifyScheduleRequestPage = () => {
  const location = useLocation();
  const {
    schedule,
    isCoupleSchedule,
  }: { schedule: ScheduleData; isCoupleSchedule: boolean } = location.state;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  const { mutate: requestModifySchedule } = useModifyScheduleRequest();

  const handleSave = (formData: ModifyScheduleRequest) => {
    console.log("수정 요청하려는 데이터:", formData);

    const requestData: ModifyScheduleRequest = {
      ...formData,
      scheduleStartAt: formData.scheduleStartAt,
      scheduleEndAt: formData.scheduleEndAt,
      groupGenderType: formData.groupGenderType,
      busyLevel: formData.busyLevel,
      scheduleLocation: formData.scheduleLocation,
      scheduleName: formData.scheduleName,
      scheduleWith: formData.scheduleWith,
      isCommon: formData.isCommon,
    };

    requestModifySchedule(requestData, {
      onSuccess: () => {
        alert("수정 요청에 성공했습니다.");
        navigate(-1);
      },
      onError: () => {
        alert("수정 요청 실패했습니다.");
      },
    });
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
