import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ModifyScheduleRequest, ScheduleData } from "../../types/ISchedule";
import { useQueryClient } from "@tanstack/react-query";
import { CoupleInfo } from "../../types/ICoupleInfo";
import CoupleAndDateInfoHeader from "./components/CoupleAndDateInfoHeader";
import { formatDateHyphen } from "../../utils/date";
import ModifyScheduleForm from "../../components/form/ModifyScheduleForm";
import {
  useAcceptScheduleModifyRequest,
  useFetchScheduleByScheduleNo,
  useModifyScheduleRequest,
} from "../../hooks/useModifySchedule";
import { fetchScheduleModifyRequest } from "../../api/schedule/scheduleAPI";

// 수정 요청 내용 작성, 수정 요청 확인
const ModifyScheduleRequestPage = () => {
  const { scheduleNo } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fromNotification = location.state?.fromNotification;
  const locationSchedule = location.state?.schedule; // 수정 요청 하는 경우
  const isCoupleSchedule = location.state?.isCoupleSchedule || false;
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  console.log(
    "수정요청 - location state 값 : ",
    fromNotification,
    " ",
    locationSchedule,
    " ",
    isCoupleSchedule
  );

  const { data: fetchedSchedule } = useFetchScheduleByScheduleNo(
    Number(scheduleNo)
  );

  const { mutate: requestModifySchedule } = useModifyScheduleRequest(); // 수정 요청 POST
  const { mutate: acceptModifyRequest } = useAcceptScheduleModifyRequest(); // 수정 수락 PUT

  const [schedule, setSchedule] = useState<ScheduleData>(
    fromNotification ? fetchedSchedule : locationSchedule
  );

  console.log("수정요청 - 스케줄 값 : ", schedule);

  useEffect(() => {
    if (fromNotification && scheduleNo) {
      fetchScheduleModifyRequest(Number(scheduleNo)).then((data) => {
        if (data) setSchedule(data);
      });
    }
  }, [fromNotification, scheduleNo]);

  const handleSave = (formData: ModifyScheduleRequest) => {
    if (locationSchedule.scheduleNo === undefined) {
      return;
    }
    console.log("수정 요청하려는 데이터:", formData);

    const requestData: ModifyScheduleRequest = {
      ...formData,
      scheduleNo: schedule.scheduleNo,
      // scheduleStartAt: formData.scheduleStartAt,
      // scheduleEndAt: formData.scheduleEndAt,
      // genderType: formData.genderType,
      // busyLevel: formData.busyLevel,
      // scheduleLocation: formData.scheduleLocation,
      // scheduleName: formData.scheduleName,
      // scheduleWith: formData.scheduleWith,
      // isCommon: formData.isCommon,
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
