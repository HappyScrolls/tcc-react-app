import { useQueryClient } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CoupleInfo } from "../../types/ICoupleInfo";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import ScheduleForm from "./components/ScheduleForm";
import { ModifyScheduleRequest, ScheduleData } from "../../types/ISchedule";
import { formatDateHyphen } from "../../utils/date";
import { useModifySchedule } from "../../hooks/useModifySchedule";

const EditSchedulePage = () => {
  const location = useLocation();
  const {
    schedule,
    isCoupleSchedule,
  }: { schedule: ScheduleData; isCoupleSchedule: boolean } = location.state;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  const { mutate: modifySchedule } = useModifySchedule();

  const handleSave = (formData: ScheduleData) => {
    console.log("수정 요청 데이터:", {
      scheduleNo: schedule.scheduleNo,
      formData,
    });

    modifySchedule(
      {
        scheduleNo: schedule.scheduleNo!,
        formData: {
          busyLevel: formData.busyLevel,
          scheduleName: formData.scheduleName,
          scheduleLocation: formData.scheduleLocation,
          scheduleWith: formData.scheduleWith,
          groupGenderType: formData.groupGenderType,
          scheduleStartAt: formData.scheduleStartAt,
          scheduleEndAt: formData.scheduleEndAt,
          isCommon: formData.isCommon,
        } as ModifyScheduleRequest,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          console.error("수정 중 오류 발생:", error);
          alert("수정 실패");
        },
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoupleAndDateInfoHeader
        selectedDate={formatDateHyphen(schedule.scheduleStartAt)}
        coupleInfo={coupleInfo}
      />
      <ScheduleForm
        onSave={handleSave}
        initialFormData={schedule}
        isCoupleSchedule={isCoupleSchedule}
      />
    </Suspense>
  );
};

export default EditSchedulePage;
