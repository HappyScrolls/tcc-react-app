import React from "react";
import EditForm from "../../../components/form/EditForm";
import {
  useMemberInfoQuery,
  useUpdateMemberInfo,
} from "../../../hooks/useMemberInfo";
import { useNavigate } from "react-router-dom";
import { IMemberInfo } from "../../../types/IMemberInfo";

const ProfileEdit = () => {
  const { data: userInfo } = useMemberInfoQuery();
  const navigate = useNavigate();
  const { mutate: updateMemberInfo } = useUpdateMemberInfo();

  const handleSubmit = (updatedUserInfo: IMemberInfo) => {
    updateMemberInfo(updatedUserInfo, {
      onSuccess: () => {
        navigate("/mypage");
      },
      onError: (error) => {
        console.error("내 정보 수정 실패:", error);
      },
    });
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <EditForm
      userInfo={userInfo}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default ProfileEdit;
