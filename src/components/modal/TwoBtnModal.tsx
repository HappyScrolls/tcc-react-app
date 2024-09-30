import React from "react";
import { ISModalProps } from "../../types/ISModalProps";
import { styled } from "styled-components";

const TwoBtnModal: React.FC<ISModalProps> = ({
  title,
  description,
  imageSrc,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      <ModalOverlay>
        <ModalContent>
          {imageSrc && <ModalImage src={imageSrc} alt="modal image" />}
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
          <ModalButtonWrapper>
            <ModalButton onClick={onConfirm}>{confirmText}</ModalButton>
            <ModalColorButton onClick={onCancel}>{cancelText}</ModalColorButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TwoBtnModal;

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
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  color: var(--Black, #3b3634);

  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalDescription = styled.div`
  margin-top: 5px;
  color: var(--Primary, #f14040);
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

const ModalButton = styled.button`
  border-radius: 10px;
  width: 90px;
  padding: 9px 0px 8px 0px;

  border-radius: 10px;
  background: #f25454;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #fff;
  text-align: center;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalColorButton = styled(ModalButton)`
  background: #fff;

  color: var(--Black, #3b3634);
`;
