import React from "react";
import CoupleForm from "../../../components/form/CoupleForm";
import createCoupleInfo from "../../../api/couple/coupleInfo";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const CoupleProfileRegister = ({ isEdit }: { isEdit: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (updatedCoupleInfo: any) => {
    try {
      await createCoupleInfo(updatedCoupleInfo);

      queryClient.setQueryData(["coupleInfo"], (oldData: any) => ({
        ...oldData,
        ...updatedCoupleInfo,
      }));

      navigate("/mypage");
    } catch (error) {
      console.error("커플 정보 저장 실패:", error);
    }
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <CoupleForm
      coupleInfo={null}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={isEdit}
    />
  );
};

export default CoupleProfileRegister;
