import React from "react";
import CoupleForm from "../../../components/form/CoupleForm";
import createCoupleInfo from "../../../api/couple/coupleInfo";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../../store/toastStore";

const CoupleProfileRegister = ({ isEdit }: { isEdit: boolean }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (updatedCoupleInfo: any) => {
    try {
      await createCoupleInfo(updatedCoupleInfo);

      queryClient.setQueryData(["coupleInfo"], (oldData: any) => ({
        ...oldData,
        ...updatedCoupleInfo,
      }));

      navigate("/mypage");
      showToast("success", "커플 정보가 저장되었습니다.");
    } catch (error) {
      console.error("커플 정보 저장 실패:", error);
      showToast("error", "커플 정보 저장을 실패했습니다.");
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
