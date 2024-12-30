import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../../components/layout/Layout";
import profileEdit from "../../../images/mypage/profileEdit.svg";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { LoverInfo } from "../../../types/ILoverInfo";
import { IMemberInfo } from "../../../types/IMemberInfo";
import {
  useFetchInviteCode,
  useRegisterInviteCode,
} from "../../../hooks/useCoupleInfo";
import copy from "../../../images/mypage/copy.svg";
import InviteCodeModal from "../../../components/modal/InviteCodeModal";
import { useToastStore } from "../../../store/toastStore";

const PersonalProfile = ({
  isMyProfile,
  profileData,
  partnerExists,
}: {
  isMyProfile: boolean;
  profileData?: IMemberInfo | LoverInfo | null;
  partnerExists: boolean;
}) => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { data: fetchedInviteCode } = useFetchInviteCode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const { mutate: registerInviteCode } = useRegisterInviteCode();

  const handleEditButton = () => {
    navigate("/profile/edit");
  };

  const showToast = useToastStore((state) => state.showToast);

  // 초대코드 생성
  const handleInviteButton = () => {
    if (fetchedInviteCode) {
      setInviteCode(fetchedInviteCode);
    } else {
      showToast("error", "초대 코드를 생성할 수 없습니다.");
    }
  };

  // 초대코드 복사
  const handleCopyInviteCode = () => {
    if (inviteCode) {
      const fullMessage = `
[Togethery]

해당 코드는 생성된 당일까지만 유효합니다.

${inviteCode}

*코드 등록 방법*
마이페이지 > 애인 프로필 + 버튼 클릭 > 초대 코드 입력
      `;

      navigator.clipboard.writeText(fullMessage);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1500);
    }
  };

  // 초대코드 등록
  const handlePlusBtn = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
      registerInviteCode(code, {
        onSuccess: () => resolve(true),
        onError: () => resolve(false),
      });
    });
  };

  return (
    <ProfileBorder>
      <ProfileHeader>
        <HeaderText isMyProfile={isMyProfile}>
          {isMyProfile ? "내 프로필" : "애인 프로필"}
        </HeaderText>
        {isMyProfile && (
          <ProfileEditIcon onClick={handleEditButton} src={profileEdit} />
        )}
      </ProfileHeader>

      {!partnerExists || !profileData ? (
        <InviteWrapper>
          <ProfileIconBox>
            <AddProfileLabel onClick={handlePlusBtn}>+</AddProfileLabel>
          </ProfileIconBox>
          {inviteCode ? (
            <InviteButton>
              <InviteCodeBox onClick={handleCopyInviteCode}>
                <img src={copy} alt="복사" />
                초대 코드 복사
              </InviteCodeBox>
              {showCopyMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  복사되었습니다!
                </p>
              )}
            </InviteButton>
          ) : (
            <InviteButton onClick={handleInviteButton}>
              초대 코드 생성
            </InviteButton>
          )}
        </InviteWrapper>
      ) : (
        <>
          <ProfileIconBox>
            <ProfileIcon src={profileData?.profilePhoto || defaultCat} />
          </ProfileIconBox>
          <ProfileFooter>
            <FooterText>{profileData?.name || "(이름)"}</FooterText>
            <FooterText>{profileData?.birthDate || "2000.00.00"}</FooterText>
          </ProfileFooter>
        </>
      )}

      <InviteCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </ProfileBorder>
  );
};

export default PersonalProfile;

const ProfileBorder = styled(Container)`
  width: 139px;
  height: 176px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #878678;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const ProfileEditIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const ProfileIconBox = styled.div`
  display: flex;
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
`;

const ProfileIcon = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const HeaderText = styled.div<{ isMyProfile: boolean }>`
  width: 80px;
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: ${({ isMyProfile }) => (isMyProfile ? "0" : "20px")};
`;

const ProfileFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 13px;
  gap: 5px;
`;

const FooterText = styled.text`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

const InviteButton = styled.div`
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  padding: 9px;
  width: 110px;
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  img {
    width: 15px;
    height: 20px;
  }
`;

const AddProfileLabel = styled.div`
  border-radius: 50%;
  background: var(--Primary, #f14040);
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 72px;
  height: 72px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ffffff;
`;

const InviteCodeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
