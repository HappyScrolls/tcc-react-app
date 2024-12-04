import React from "react";
import styled from "styled-components";
import { CoupleInfo } from "../../types/ICoupleInfo";
import {
  isInvalidCoupleInfo,
  isValidCoupleInfo,
} from "../../utils/coupleCheck";

interface SettingModalProps {
  onLogout: () => void;
  onDeleteCoupleProfile: () => void;
  onWithdraw: () => void;
  onClose: () => void;
  coupleInfo: CoupleInfo | null;
}

const SettingModal: React.FC<SettingModalProps> = ({
  onLogout,
  onDeleteCoupleProfile,
  onWithdraw,
  onClose,
  coupleInfo,
}) => {
  const validCoupleInfo = isValidCoupleInfo(coupleInfo);
  const invalidCoupleInfo = isInvalidCoupleInfo(coupleInfo);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>환경 설정</ModalTitle>
        <ButtonWrapper>
          <ActionButton buttonType="default" onClick={onLogout}>
            로그아웃
          </ActionButton>

          {invalidCoupleInfo && (
            <ActionButton buttonType="delete" onClick={onDeleteCoupleProfile}>
              💔 애인 정보 삭제하기
            </ActionButton>
          )}
          {validCoupleInfo && (
            <ActionButton buttonType="delete" onClick={onDeleteCoupleProfile}>
              💔 커플 프로필 삭제하기
            </ActionButton>
          )}
          <ActionButton buttonType="withdraw" onClick={onWithdraw}>
            회원 탈퇴
          </ActionButton>
        </ButtonWrapper>
        <Footer>
          <FooterButton onClick={onClose}>닫기</FooterButton>
          <FooterButton confirm onClick={onClose}>
            완료
          </FooterButton>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 250px;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ModalTitle = styled.div`
  width: 100%;
  text-align: left;
  color: #3b3634;
  font-family: SUIT;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 100%;
`;

const ActionButton = styled.button<{
  buttonType?: "default" | "delete" | "withdraw";
}>`
  width: 100%;
  padding: 8px 0px 9px 0px;
  border-radius: 10px;
  border: none;
  font-family: SUIT;
  font-size: 11px;
  font-weight: 600;

  color: ${({ buttonType }) => {
    switch (buttonType) {
      case "delete":
        return "#3B3634";
      case "withdraw":
        return "#fff";
      default:
        return "#3b3634";
    }
  }};

  background: ${({ buttonType }) => {
    switch (buttonType) {
      case "delete":
        return "#FFCFC7";
      case "withdraw":
        return "#F14040";
      default:
        return "#fff";
    }
  }};

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const FooterButton = styled.button<{ confirm?: boolean }>`
  flex: 1;
  padding: 8px 0px 9px 0px;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  color: ${({ confirm }) => (confirm ? "#fff" : "#3b3634")};
  background: ${({ confirm }) => (confirm ? "#F14040" : "#f5f5f5")};
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
