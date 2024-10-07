import React from "react";
import CoupleForm from "../../../components/form/CoupleForm";
import { useNavigate } from "react-router-dom";
import { CoupleInfo } from "../../../types/ICoupleInfo";

const CoupleRegister = () => {
  const navigate = useNavigate();

  // 등록 완료 후 동작
  const handleRegister = (newCoupleInfo: CoupleInfo) => {
    // console.log("등록할 커플 정보:", newCoupleInfo);
    alert("등록 완료");
    navigate("/couple-page");
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <CoupleForm
      onSubmit={handleRegister}
      onCancel={handleCancel}
      isEdit={false}
    />
  );
};

export default CoupleRegister;
