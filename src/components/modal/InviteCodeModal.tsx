import React, { useState } from "react";
import styled from "styled-components";
import { IModalProps } from "../../types/IModalProps";

interface InviteCodeModalProps extends IModalProps {
  onConfirm: (inviteCode: string) => Promise<boolean>;
}

const InviteCodeModal: React.FC<InviteCodeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isError, setIsError] = useState(false);

  const handleConfirm = async () => {
    const success = await onConfirm(inviteCode);
    if (!success) {
      setIsError(true);
    } else {
      setIsError(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>초대 코드 입력하기</ModalTitle>
        <Input
          type="text"
          placeholder="초대코드"
          value={inviteCode}
          onChange={(e) => {
            setInviteCode(e.target.value);
            setIsError(false);
          }}
        />
        {isError && <ErrorMessage>존재하지 않는 코드입니다.</ErrorMessage>}
        <ButtonContainer>
          <CancelButton onClick={onClose}>이전</CancelButton>
          <ConfirmButton onClick={handleConfirm}>애인 등록</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InviteCodeModal;

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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 250px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;

  display: flex;
  width: 202px;
  padding: 10px;
  align-items: center;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  font-size: 12px;
`;

const ErrorMessage = styled.p`
  color: var(--Primary, #f14040);
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CancelButton = styled.button`
  display: flex;
  width: 100px;
  padding: 9px 0px 8px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ConfirmButton = styled.button`
  display: flex;
  padding: 9px 31px 8px 31px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--Primary, #f14040);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--White, #fff);
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
