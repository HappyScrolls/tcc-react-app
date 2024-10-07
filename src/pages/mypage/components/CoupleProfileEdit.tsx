import React from "react";

import {
  useFetchCoupleInfo,
  useUpdateCoupleInfo,
} from "../../../hooks/useCoupleInfo";
import { useNavigate } from "react-router-dom";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import CoupleForm from "../../../components/form/CoupleForm";

const CoupleProfileEdit = ({ isEdit }: { isEdit: boolean }) => {
  const { data: coupleInfo } = useFetchCoupleInfo();
  const navigate = useNavigate();
  const { mutate: updateCoupleInfo } = useUpdateCoupleInfo();

  const handleSubmit = (updatedCoupleInfo: CoupleInfo) => {
    updateCoupleInfo(updatedCoupleInfo, {
      onSuccess: () => {
        navigate("/mypage");
      },
      onError: (error) => {
        console.error("커플 정보 수정 실패:", error);
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
