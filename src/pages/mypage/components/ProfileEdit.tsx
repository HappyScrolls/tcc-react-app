import React from "react";
import EditForm from "../../../components/form/EditForm";
import {
  useMemberInfoQuery,
  useUpdateMemberInfo,
} from "../../../hooks/useMemberInfo";
import { useNavigate } from "react-router-dom";
import { IMemberInfo } from "../../../types/IMemberInfo";
import { useToastStore } from "../../../store/toastStore";

const ProfileEdit = () => {
  const { data: userInfo } = useMemberInfoQuery();
  const navigate = useNavigate();
  const { mutate: updateMemberInfo } = useUpdateMemberInfo();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = (updatedUserInfo: IMemberInfo) => {
    updateMemberInfo(updatedUserInfo, {
      onSuccess: () => {
        navigate("/mypage");
        showToast("success", "내 정보가 수정되었습니다.");
      },
      onError: (error) => {
        console.error("내 정보 수정 실패:", error);
        showToast("error", "수정을 실패하였습니다.");
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
