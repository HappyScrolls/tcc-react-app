import React from "react";

import {
  useFetchCoupleInfo,
  useUpdateCoupleInfo,
} from "../../../hooks/useCoupleInfo";
import { useNavigate } from "react-router-dom";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import CoupleForm from "../../../components/form/CoupleForm";
import { useToastStore } from "../../../store/toastStore";

const CoupleProfileEdit = ({ isEdit }: { isEdit: boolean }) => {
  const { data: coupleInfo } = useFetchCoupleInfo();
  const navigate = useNavigate();
  const { mutate: updateCoupleInfo } = useUpdateCoupleInfo();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = (updatedCoupleInfo: CoupleInfo) => {
    updateCoupleInfo(updatedCoupleInfo, {
      onSuccess: () => {
        navigate("/mypage");
        showToast("success", "커플 정보가 수정되었습니다.");
      },
      onError: (error) => {
        console.error("커플 정보 수정 실패:", error);
        showToast("error", "커플 정보 수정을 실패하였습니다.");
      },
    });
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <CoupleForm
      coupleInfo={coupleInfo}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={isEdit}
    />
  );
};

export default CoupleProfileEdit;
