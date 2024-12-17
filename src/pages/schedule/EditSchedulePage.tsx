import { useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CoupleInfo } from "../../types/ICoupleInfo";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import ScheduleForm from "./components/ScheduleForm";
import { ModifyScheduleRequest, ScheduleData } from "../../types/ISchedule";
import { formatDateHyphen } from "../../utils/date";
import { useModifySchedule } from "../../hooks/useModifySchedule";
import { useFetchScheduleByScheduleNo } from "../../hooks/useScheduleList";

const EditSchedulePage = () => {
  const { scheduleNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const fromNotification = location.state?.fromNotification;
  const locationSchedule = location.state?.schedule;
  const isCoupleSchedule = location.state?.isCoupleSchedule || false;

  const { data: fetchedSchedule } = useFetchScheduleByScheduleNo(
    Number(scheduleNo)
  );

  const [schedule, setSchedule] = useState<ScheduleData>(
    locationSchedule || fetchedSchedule
  );

  useEffect(() => {
    if (!locationSchedule && fetchedSchedule) {
      setSchedule(fetchedSchedule);
    }
  }, [fetchedSchedule, locationSchedule]);

  // useEffect(() => {
  //   const updateScheduleFromNotification = async () => {

  //     if (fromNotification) {
  //       const fetchedSchedule = await fetchScheduleModifyRequest(
  //         initialSchedule.scheduleNo
  //       );
  //       if (fetchedSchedule) {
  //         setSchedule(fetchedSchedule);
  //       }
  //     }
  //   };

  //   updateScheduleFromNotification();
  // }, [fromNotification, initialSchedule]);

  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);
  const { mutate: modifySchedule } = useModifySchedule();

  const handleSave = (formData: ScheduleData) => {
    modifySchedule(
      {
        scheduleNo: schedule?.scheduleNo!,
        formData: {
          ...formData,
          // busyLevel: formData.busyLevel,
          // scheduleName: formData.scheduleName,
          // scheduleLocation: formData.scheduleLocation,
          // scheduleWith: formData.scheduleWith,
          // genderType: formData.genderType,
          // scheduleStartAt: formData.scheduleStartAt,
          // scheduleEndAt: formData.scheduleEndAt,
          // isCommon: formData.isCommon,
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
